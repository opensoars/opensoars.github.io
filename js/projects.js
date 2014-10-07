var REPOS_CONT = document.getElementById('projects'),
    REPOS_URL = 'https://api.github.com/users/opensoars/repos'


function getProjectHtml(repo){
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


function handleRepos(repos){

  repos = repos || [];

  if(repos.length === 0 || repos.constructor !== Array)
    return REPOS_CONT.innerHTML = 'Could not /GET repos!';

  repos.sort(function (a, b){
    return (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  });


  REPOS_CONT.innerHTML = '';

  repos.forEach(function(repo){
    REPOS_CONT.innerHTML += getProjectHtml(repo);
  });

}


(function reqRepos(){

  var req = new XMLHttpRequest();

  req.onreadystatechange = function (){

    if(this.readyState === 4){
      try{
        var repos = JSON.parse(this.response);
        handleRepos(repos);
      }
      catch(e){
        console.log(e);
        handleRepos();
      }
    }

  };

  req.open('GET', REPOS_URL, true);
  req.send();

  setTimeout(reqRepos, 300000);
}());





