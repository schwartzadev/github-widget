	var totalDownloads = 0

	$(document).ready(function() {
		var UrlUser = getUrlVar("user");
		var UrlRepo = getUrlVar("repo");
		getDlCount(UrlUser, UrlRepo);
		getRepo(UrlUser, UrlRepo);
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
					owner : data.owner.login,
					url : data.html_url
				};
				$("#name").text(repo.name);
				$("#stars").text(repo.stars.toLocaleString());
				$("#forks").text(repo.forks.toLocaleString());
				$("#issues").text(repo.openIssues.toLocaleString());
				$("#author").text(repo.owner);
				$("#title-link").attr("href", repo.url)
				return repo;
			}
		});
	}

	function getDlCount(u, r) {
		var location = "https://api.github.com/repos/" + u + "/" + r + "/releases"
		$.ajax({
			url: location,
			headers: {
				// "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
			},
			error:function (xhr, ajaxOptions, thrownError) {
				if(xhr.status==404) {
					$("#title-link").text("404 - check url string");
					$("#title-link").css('textDecoration','none');
					$(".info").hide();
					$(".source").hide();
				};
			}
		}).then(function(data) {
			for (var i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i]["assets"].length; j++) {
					var c = data[i]["assets"][j]["download_count"];
					totalDownloads += c;
				};
			};
			if (totalDownloads > 0) {
				$("#total-dl").text(totalDownloads.toLocaleString());
			}
			else {
				$("#dl-container").hide()
			}
		});
	};
