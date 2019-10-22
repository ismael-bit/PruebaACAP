var postTemplate = `<div>
<h3>{{TITLE}}</h3>
<h5>By: {{NAME}} - <span style="color: gray;"><a href="#"  data-userid="{{USERID}}" class="btnEmail">{{EMAIL}}</a></span></h5>
<p>{{BODY}}</p>
<hr>
</div>
`;

var UserTemplate = `<div>
<h3>Usuario: <i>{{NAME}}</i></h3>
<h4>Correo: <i>{{EMAIL}}</i></h4>
<h5>Posts: <i>{{POSTS}}</i></h5>
</div>
`;

export function showPost(){

    console.log("Muestra todos los posts...");

    fetch('http://itla.hectorvent.com/api/post',{
        headers:{
            'Authorization': 'Bearer e4d9932e-15a8-4d15-8e95-3e08bf7299ff'
        }
    })
    .then(res=>res.json())
    .then(res=>{
        var postView = '';
        res.forEach(p => {
            postView = postView + postTemplate.replace('{{BODY}}',p.body)
                                              .replace('{{NAME}}',p.userName)
                                              .replace('{{EMAIL}}',p.userEmail)
                                              .replace('{{TITLE}}',p.title)
                                              .replace('{{USERID}}',p.userId);

                                            });
        document.getElementById("app").innerHTML=postView;
        var bes = document.getElementsByClassName("btnEmail");
        for(i=0; i < bes.length;i++){
            bes[i].addEventListener('click',showUserProfile);
        }

    })
    .catch(err=> {
        console.log(err);
    })
}

function showUserProfile(event){
    var ueObject = event.target;
    var idUser = ueObject.getAttribute('data-userid');
    showinfoUser(idUser);
}

function showinfoUser(idUser){

    fetch('http://itla.hectorvent.com/api/users/'+idUser,{
        headers:{
            'Authorization': 'Bearer e4d9932e-15a8-4d15-8e95-3e08bf7299ff'
        }
    })
    .then(res=>res.json())
    .then(res=>{
    var _UserTemplate='';
    _UserTemplate = UserTemplate.replace("{{EMAIL}}",res.email).replace("{{NAME}}",res.name).replace("{{POSTS}}",res.posts)
    console.log(_UserTemplate);
    document.getElementById("app").innerHTML=_UserTemplate;
    console.log(res);
    })
    .catch(err=> {
        console.log(err);
    })
}

export function showinfoUserMe(){

    fetch('http://itla.hectorvent.com/api/users/me',{
        headers:{
            'Authorization': 'Bearer e4d9932e-15a8-4d15-8e95-3e08bf7299ff'
        }
    })
    .then(res=>res.json())
    .then(res=>{
    var _UserTemplate='';
    _UserTemplate = UserTemplate.replace("{{EMAIL}}",res.email).replace("{{NAME}}",res.name).replace("{{POSTS}}",res.posts)
    console.log(_UserTemplate);
    document.getElementById("app").innerHTML=_UserTemplate;
    console.log(res);
    })
    .catch(err=> {
        console.log(err);
    })
}

export function showMyPost(){

    //console.log('yo: ' + me.id);

    fetch('http://itla.hectorvent.com/api/post?userId='+me.id,{
        headers:{
            'Authorization': 'Bearer e4d9932e-15a8-4d15-8e95-3e08bf7299ff'
        }
    })
    .then(res=>res.json())
    .then(res=>{
        //console.log(res);
        var postView = '';
        res.forEach(p => {
            //console.log(p);
            postView = postView + postTemplate.replace('{{BODY}}',p.body)
                                              .replace('{{NAME}}',p.userName)
                                              .replace('{{EMAIL}}',p.userEmail)
                                              .replace('{{TITLE}}',p.title)
                                              .replace('{{USERID}}',p.userId);

                                            });
        document.getElementById("app").innerHTML=postView;
        var bes = document.getElementsByClassName("btnEmail");
        for(i=0; i < bes.length;i++){
            bes[i].addEventListener('click',showUserProfile);
        }

    })
    .catch(err=> {
        console.log(err);
    })
}

export default {showPost, showMyPost, showinfoUserMe};