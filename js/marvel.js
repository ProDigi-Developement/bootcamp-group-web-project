var marvel = {
    render:function(){
        var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9ee0b85395a02374c6a6716c1771b096&hash=a1111f517c9c48bd3c251cc0575799fb";
        var message = document.getElementById('message');
        var footer = document.getElementById('footer');
        var marvelContainer = document.getElementById('marvel-container');
        $.ajax({
            url:url,
            type: "GET",
            beforeSend: function(){
                message.innerHTML = "Loading..."
            },
            complete: function(){
                message.innerHTML = "Successfully Done.."
            },
            success: function(data){
                footer.innerHTML = data.attributionHTML;
                var str = "";;
                str +="<div class='row'>";
                for(var i=0; i<data.data.results.length; i++){
                    var element = data.data.results[i];
                    console.log(element.name);
                    str += "<div class='col-md-3'>";
                    str += "<a href='"+ element.urls[0].url +"' target='_blank'>";
                    str += "<img src='"+element.thumbnail.path+"/portrait_fantastic."+
                    element.thumbnail.extension+"'";
                    str += "</a>"
                    str += "<h3>"+element.name+"</h3>";
                    str += "</div>";
                }
                if((i+1)%4==0){
                    str+="</div>";
                    str +="<div class='row'>";
                }
                
                marvelContainer.innerHTML = str;
            },
            error: function(){
                message.innerHTML = "Sorry Something went Wrong..."
            }
        });
    }

};

    marvel.render();
