var me = null;

import {showPost, showMyPost, showinfoUserMe} from './components/post';

function loadMe(){

    fetch('http://itla.hectorvent.com/api/users/me',{
        headers:{
            'Authorization': 'Bearer e4d9932e-15a8-4d15-8e95-3e08bf7299ff'
        }
    })
    .then(res=>res.json())
    .then(res=>{
        console.log(res.id);
        me = res;
        // return res.id;
        console.log('Loged')
    })
    .catch(err=> {
        // return 0;
        console.log(err);
    })
}

// function showMyPost(){
//     console.log("Muestra mis posts...");
//     document.getElementById("app").innerHTML="<h1>Muestra mis posts...</h1>";

// }

// function showProfile(){
//     console.log("Muestra Perfil...");
//     document.getElementById("app").innerHTML="<h1>Muestra Perfil...</h1>";
// }

window.onload =  function(){
    console.log("eta vaina ta bien...");

    loadMe();


    document.getElementById("post_view").addEventListener('click',showPost);
    document.getElementById("mypost_view").addEventListener('click',showMyPost);
    document.getElementById("profile_view").addEventListener('click',showinfoUserMe);

}