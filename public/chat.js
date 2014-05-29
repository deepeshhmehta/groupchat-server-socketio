window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3070');//replace "localhost" with ip of the computer you chose as server
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");


    name.focus();
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html +="&nbsp;"+'<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
content.scrollTop = content.scrollHeight;
        } else {
            alert("message cannot be blank");
            console.log("There is a problem:", data);
        }
    });
 
   $("#send").click(sendMessage = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {

            var txt = field.value;
            
            socket.emit('send', { message: txt, username: name.value });
            field.value="";
            $("#name").hide();
            $("#nameO").hide();
        }
    });

    $(document).ready(function() {
        $("#field").keydown(function(e) {
            if(e.keyCode == 13) {
            sendMessage();
            }
        });

        $("#Chat").click(privatechat=function(){

            $("#PrivateChat").css("background-color","yellow");
            
        });

        $("#targetName").keydown(function(e){
            if (e.keyCode==17){
                $("#targetName").keydown(function(f){
                    if (f.keyCode==13){
                        privatechat();}
                    });
            }
        });
    });


 
}
