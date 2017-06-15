	var totalDownloads = 0

	$(document).ready(function() {
		var UrlUser = getUrlVar("user");
		var UrlRepo = getUrlVar("repo");
		getDlCount(UrlUser, UrlRepo);
		getRepo(UrlUser, UrlRepo);
		// console.log(repo)
	});


	function getUrlVar(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0; i<vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			};
		};
		return(false);
	};

	function getRepo(u, r) {
		$.ajax({
			url: "https://api.github.com/repos/" + u + "/" + r,
			headers: {
				// "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
			},
			success:function(data) {
				var repo = {
					name : data.name,
					forks : data.forks_count,
					openIssues : data.open_issues_count,
					stars : data.stargazers_count,
					size : data.size,
					owner : data.owner.login
				};
				console.log(repo);
				$("#name").text(repo.name);
				$("#stars").text(repo.stars.toLocaleString());
				$("#forks").text(repo.forks.toLocaleString());
				$("#issues").text(repo.openIssues.toLocaleString());
				$("#author").text(repo.owner);
				return repo;
			}
		});
	}

	function getDlCount(u, r) {
		var location = "https://api.github.com/repos/" + u + "/" + r + "/releases"
		$.ajax({
			// url: "https://api.github.com/repos/schwartzadev/debate-timer/releases",
			// url: "https://api.github.com/repos/" + user + "/" + repo + "/releases",
			url: location,
			headers: {
				// "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
			},
			error:function (xhr, ajaxOptions, thrownError) {
				if(xhr.status==404) {
					$("#total-dl").text("404 - check url string");
				};
			}
		}).then(function(data) {
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i]["assets"].length; j++) {
					var c = data[i]["assets"][j]["download_count"];
					totalDownloads += c;
				};
			};
			console.log("total downloads:\t" + totalDownloads);
			$("#total-dl").text(totalDownloads.toLocaleString());
		});
	};
