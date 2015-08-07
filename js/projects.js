// Gets filled with completed repo templates
var projects_section = document.getElementById('projects_section');
  
var REPOS_URL = 'https://api.github.com/users/opensoars/repos';

var GET_INTERVAL = 200000;


/**
 * HTML template for a repo.
 *
 * @param {object} repo - Repo object from repos array
 * @return {string} - Completed repo html
 */
function getRepoHTML(repo){
  return ""
    + "<div class='project'>"
    + "<h5 class='project-title'><a href='"
    + (repo.homepage ? repo.homepage : repo.html_url)
    + "'>> " + repo.name + "</a></h5>"

    + (repo.description 
       ? "<p class='project-desc'>— " + repo.description + "</p>"
       : "" 
      )

    + "<hr>"
    + "</div>";
}

/**
 * Handles an array of repos. Loops through repos, calling
 * getRepoHTML for every repo and draws the returned HTML in the
 * projects_section.
 * 
 * @param {array} repos
 */
function handleRepos(repos){
  repos = repos || [];

  if(repos.length === 0 || repos.constructor !== Array)
    return projects_section.innerHTML = 'Could not /GET repos!';

  repos.sort(function (a, b){
    return (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  });


  projects_section.innerHTML = '';

  repos.forEach(function(repo){
    projects_section.innerHTML += getRepoHTML(repo);
  });
}


/** Recursive ajax GET repos function. */
/*
(function getRepos(){
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

  setTimeout(getRepos, GET_INTERVAL);
}());
*/




