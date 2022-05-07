<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<title>Azabell Code Blog Login</title>
	<link rel="stylesheet" href="/css/style.css">
	<script src="https://kit.fontawesome.com/51db22a717.js" crossorigin="anonymous"></script>
	<style>
		#idcheck {
		color : red;
		font-size : 15pt;
		}
	</style>
</head>
<body>
	<section class="JoinCSS">
	<form action="./index.jsp" method="post">
		<div class="main-container">
			<div class="main-wrap">
			<header>
				<div class="logo-wrap">
					<img src="img/logo.png">
				</div>
			</header>
		     	<section class="login-input-section-wrap">
					<div class="login-input-wrap">
							<!-- 아이디 :  --><input type="text" name="userID" id="userID" placeholder="아이디는 수정 불가합니다." maxlength=20/><span id="idMessage" ></span><br />
							
					</div>
					<div class="login-input-wrap">
						<!-- 비밀번호 :  --><input type="password" name="userPassword" id="userPassword" placeholder="비밀번호 입력"/><span id="pwdMessage"></span><br />
					</div>
					<div class="login-input-wrap">
						<!-- 비밀번호확인 :  --><input type="password"  id="userPasswordChk" placeholder="비밀번호 확인" /><span id="pwdCkMessage"></span><br />
					</div>
					<div class="login-input-wrap">
						<!-- 이름 :  --><input type="text" name="userName" id="userName" placeholder="유저 이름"/><span id="nameMessage"></span><br />
					</div>
					<div class="login-input-wrap">
						<!-- 메일주소 : --> <input type="email" name="userEmail" id="userEmail" placeholder="유저 이메일"/><span id="emailMessage"></span><br />
					</div>
					<div class="box-radio-input">
						<label class="box-radio-input"><input type="radio" name="userGender" autocomplete="off" id="userGender" value="MALE" checked="checked"><span>남 자</span></label>
						<label class="box-radio-input"><input type="radio" name="userGender" autocomplete="off" id="userGender" value="FEMALE" checked><span>여 자</span></label>
					</div>
					
														
					<section class="login-input-section-wrap">
							<div class="login-button-wrap">
								<button>회 원 가 입</button>
							</div>
							<br/>
					</section>
				</section>
				<footer>
					<div class="copyright-wrap">
					<span>CopyLight@2022 Azabell Code Blog</span>
					</div>
				</footer>
			</div>
		</div>
	</form>
	</section>
</body>
<!-- 
1. 자바스크립트랑 연결되는 링크가 <head>안에 있는지 확인(파일 경로가 제대로 들어갔는지도 확인.)
2. 체크박스에서 required 없애기.      required="required" 
3. form 으로 묶어줬는지 확인.(서버로 정보를 보낼때 form으로 태그들을 감싸서 전달하는역할)
4. 체크박스의 name="이부분" 과 자바스크립트에서 조건 체크할때 쓴 변수명을 같게 했는지 확인.

 -->