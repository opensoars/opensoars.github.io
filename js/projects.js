// Gets filled with completed repo templates
var REPOS_CONT = document.getElementById('projects');
  
var REPOS_URL = 'https://api.github.com/users/opensoars/repos';

var GET_INTERVAL = 200000;


/**
 * HTML template for a repo.
 *
 * @param repo {object}
 * @return {string}  Completed repo template
 */
function getRepoHTML(repo){
  return ""
    + "<div class='project'>"
    + "<h5 class='project-title'><a href='"
    + (repo.homepage ? repo.homepage : repo.html_url)
    + "'>- " + repo.name + "</a></h5>"

    + (repo.description 
       ? "<p class='project-desc'>&nbsp; — " + repo.description + "</p>"
       : "" 
      )

    + "<hr>"
    + "</div>";
}

/**
 * Handles an array of repos. Loops through repos, calling
 * getRepoHTML for every repo and draws the returned HTML in the REPOS_CONT.
 * 
 * @param repos {array}
 */
function handleRepos(repos){

  repos = repos || [];

  if(repos.length === 0 || repos.constructor !== Array)
    return REPOS_CONT.innerHTML = 'Could not /GET repos!';

  repos.sort(function (a, b){
    return (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  });


  REPOS_CONT.innerHTML = '';

  repos.forEach(function(repo){
    REPOS_CONT.innerHTML += getRepoHTML(repo);
  });

}


/** Recursive ajax GET repos function. */
(function reqRepos(){

  var req = new XMLHttpRequest();

  req.onreadystatechange = function (){

    if(this.readyState === 4){
      try{
        var repos = JSON.parse(this.response);
        handleRepos(repos);
      }
      catch(e){
        handleRepos();
      }
    }

  };

  req.open('GET', REPOS_URL, true);
  req.send();

  setTimeout(reqRepos, GET_INTERVAL);
}());





