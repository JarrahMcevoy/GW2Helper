var userinfo = []
var old = localStorage.getItem("userinfo");
    if(old === null){ 
    	localStorage.setItem("userinfo", "") 
	}else{
	userinfo = JSON.parse(localStorage.getItem("userinfo"))
}    

document.getElementById('acccreate').onclick = function () { 
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var APIKey = document.getElementById('APIKey').value;
	if (username == "" || password == "") {
		acccreatealert.style.color = "red" 
		document.getElementById("acccreatealert").innerHTML = "Invalid username/password"
	}else if(APIKey.length != 72){
		acccreatealert.style.color = "red" 
		document.getElementById("acccreatealert").innerHTML = "Invalid API Key"
	}else{	
	userinfo.push({"username": username, "password": password, "APIKey": APIKey},)
	localStorage.setItem("userinfo", JSON.stringify(userinfo))
	localStorage.setItem("username", username)
	acccreatealert.style.color = "green"
	document.getElementById("acccreatealert").innerHTML = "Account created. Logging in..."
	localStorage.setItem("LogKey", "?access_token=" + APIKey)
	window.location.href = "HomePage.html";
}}
//Validates and creates new accounts

document.getElementById('confirmlogin').onclick = function (){
	var usernamelogin = document.getElementById('usernamelogin').value
	var passwordlogin = document.getElementById('passwordlogin').value
	userinfo = JSON.parse(localStorage.getItem("userinfo"))
	$.each(userinfo, function(key, value){
		if (userinfo[key].username == usernamelogin) {
			if (userinfo[key].password == passwordlogin) {
				localStorage.setItem("LogKey", "?access_token=" + userinfo[key].APIKey)
				localStorage.setItem("username", userinfo[key].username)
				loginAlert.style.color = "green"
				document.getElementById("loginAlert").innerHTML = "Login Successful"
				window.location.href = "HomePage.html";
			}else{ 
				loginAlert.style.color = "red"
				document.getElementById("loginAlert").innerHTML = "Invalid login"
			}
		}else{
			loginAlert.style.color = "red"
			document.getElementById("loginAlert").innerHTML = "Invalid login"
		}
	})
} 

var globalData

function HomePage(){
	var array = SearchAPI("v2/account")

	function SearchAPI(suffix) {
		console.log("!")
		return $.get("https://api.guildwars2.com/" + suffix + localStorage.getItem("LogKey"), function(data, status){
			
			globalData = data
			//document.getElementById("account").innerHTML = JSON.stringify(globalData)
			var charname = globalData.name
			console.log(charname)
			document.getElementById("welcome").innerHTML = "Welcome " + localStorage.getItem("username")+"! (" + globalData.name +")"
		})
	}

} 

function SearchAPI(suffix,retrieveddata){
	return $.get("https://api.guildwars2.com/" + suffix + localStorage.getItem("LogKey"), function(data, status){
	retrieveddata = data

	})
}

document.getElementById('crafthelp').onclick = function (){
	document.getElementById("craft").style.outlineWidth = "thick"
	window.location.href = "crafting.html";
}

document.getElementById('dailyach').onclick = function (){
	document.getElementById("achieve").style.outlineWidth = "thick"
	window.location.href = "achievement.html";
}
