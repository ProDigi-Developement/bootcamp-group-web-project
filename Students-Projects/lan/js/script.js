

function setup( ){

	
	fetch("http://api.open-notify.org/astros.json")
  .then( (resp)=> resp.json())
  .then( function (data){
    let count = data.number;

    
    document.getElementById("result").innerHTML = count;



    
  });
		
		

}




$("document").ready(function (){
       
       
        
        	setup();
        	
      
  	 		
        
  	 	});
