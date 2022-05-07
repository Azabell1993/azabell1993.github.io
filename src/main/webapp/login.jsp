<%@page import="AzabellBlog.MemberVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//로그인 유무를 체크 1. 세션을 이용하는 방법, 2.쿠키를 이용하는 방법 => 2.1 자동로그인, 2.2 수동로그인
	String state = (String)session.getAttribute("login");
	MemberVO vo = (MemberVO)session.getAttribute("userInfo");
	// 로그인 상태라면 로그아웃화면이 나오고=> 
	// 로그인 상태가 아니라면 로그인화면이 나온다.
%>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Azabell Code Blog Login</title>
	<link rel="stylesheet" href="/css/style.css">
	<script src="https://kit.fontawesome.com/51db22a717.js" crossorigin="anonymous"></script>
</head>
<body>
	<!-- login Screen -->
	<div class="main-container">
		<div class="main-wrap">
		<header>
			<div class="logo-wrap">
				<img src="img/logo.png">
			</div>
		</header>
		<form action="LoginAction.jsp" method="post">
			<section class="login-input-section-wrap">
				<div class="login-input-wrap">	
					<input placeholder="Username" type="text" name="userID" maxlength="20"></input>
				</div>
				<div class="login-input-wrap">	
					<input placeholder="Password" type="password" name="userPassword" maxlength="20"></input>
				</div>
				<div class="login-button-wrap">
					<button>로  그  인</button>
				</div>
			</section>
		</form>
		<form method="post" action="MemberJoin.jsp">
			<section class="password-wrap">
				<div class="join-button-wrap">
					<button>회 원 가 입</button>
				</div>
				<br/>
			</section>
		</form>
	
				<!-- Cookie Secssion... -->
				<!-- spring 진도시 할 것 -->
				<div class="login-stay-sign-in">
				   <input type="checkbox" class="form-check-input" id="rememberMe" name="remember-me" checked>
				  <label class="form-check-label" for="rememberMe" aria-describedby="rememberMeHelp">로그인 유지</label>
				</div>
		<footer>
			<div class="copyright-wrap">
			<span>CopyLight@2022 Azabell Code Blog</span>
			</div>
		</footer>
		</div>
	</div>
</body>