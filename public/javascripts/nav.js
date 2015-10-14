$(function() {
	$('#login-btn').click(function() {
		$.ajax(
			'/login',
			{
				data: {
					email: $('#login-email').val(), 
					password: $('#login-password').val(),
				},
				type: 'POST',
			}
		).done(loginCallback);
	});
	
	$('#signup-btn').click(function() {
		$.ajax(
			'/register',
			{
				data: {
					email: $('#signup-email').val(), 
					password: $('#signup-password').val(),
				},
				type: 'POST',
			}
		).done(signupCallback);
	})

	$('#start-date').datepicker();
	$('#end-date').datepicker();
	
	$('#logout-tab').click(function() {
		$.ajax("/logout", {
			type: "GET"
		}).done(function(res) {
			$('#login-control').removeClass("hidden");
			$('#user-display').text("");
			$('#user-control').addClass("hidden");
		});
	});
});

function loginCallback(data) {
	console.log(data.result);
	if (data.message == "success") {
		$("#login-modal").modal("hide");
		$('#login-control').addClass("hidden");
		$('#user-display').text(data.account.email);
		$('#user-control').removeClass("hidden");
		//$('#dashboard-tab a').attr("href","/guide/dashboard/" + data.user._id);
		if (data.account.role == "guide") {
			$('#guide-apply-tab').addClass("hidden");
		} else {
			$('#guide-apply-tab').removeClass("hidden");
		}
	} else {
		$("#login-modal .error-wrapper").show();
		$('#login-email').val("");
		$('#login-password').val("");
	}
}

function signupCallback(data) {
	console.log(data.account);
	if (data.message == "success") {
		$("#signup-modal").modal("hide");
		alert("亲爱的" + data.account.email + ",欢迎加入旅橙网！");
		$('#login-control').addClass("hidden");
		$('#user-display').text(data.account.email);
		$('#user-control').removeClass("hidden");
		//$('#dashboard-tab a').attr("href","/guide/dashboard/"+data.user._id);
		if (data.user.role == "guide") {
			$('#guide-apply-tab').addClass("hidden");
		} else {
			$('#guide-apply-tab').removeClass("hidden");
		}
	} else if (data.message == "exist") {
		$("#signup-modal .error-wrapper").show();
		$('#signup-email').val("");
		$('#signup-password').val("");
	}
}