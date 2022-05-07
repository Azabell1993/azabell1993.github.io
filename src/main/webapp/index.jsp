<%@page import="AzabellBlog.MemberVO"%>
<%@page import="AzabellBlog.MemberDAO"%>
<jsp:useBean id="vo2" class="AzabellBlog.MemberVO" />
<jsp:setProperty property="*" name="vo2"/>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%
	//로그인 유무를 체크 1. 세션을 이용하는 방법, 2.쿠키를 이용하는 방법 => 2.1 자동로그인, 2.2 수동로그인
	String state = (String)session.getAttribute("login");
	MemberVO vo = (MemberVO)session.getAttribute("userInfo");
	// 로그인 상태라면 로그아웃화면이 나오고=> 
	// 로그인 상태가 아니라면 로그인화면이 나온다.
%>
<%
	MemberDAO dao = new MemberDAO();
	int result = dao.insert(vo2);
	if(result == 1){
		// 회원 가입 성공 => 로그인 상태
		session.setAttribute("userInfo", vo2);
		session.setAttribute("login", "success");//사족(간편하게 활용하기 위한 용도)
	}
%>
<!DOCTYPE HTML>
<!--
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<style>
	#topMenu {            /*topMenu의 ID를 가진 태그의 스타일 지정*/
        
        font-size: 14px;
		padding : 10px;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
   }
    #topMenu ul li {
    	list-style: none;           /*<li> 태그는 위의 이미지처럼 목록을 나타내는 점을 없앤다 */
        color: white;               /*글씨 색을 흰색으로 설정*/
        background-color: #807c7c;  /*배경색 설정*/
        float: left;                /*<li>태그들이 왼쪽에 흐르게 설정(그러면 아래있는 내용은 오른쪽으로 옴)*/
        line-height: 30px;          /*글씨가 가운데로 오도록 설정하기 위해 한줄의 높이를 30px로 설정*/
        vertical-align: middle;     /*세로 정렬을 가운데로 설정(위의 line-height와 같이 설정 필요함)*/
        text-align: center;         /*글씨 정렬을 가운데로 설정*/
    }
    
    #topMenu .menuLink {                               /*topMenu 아이디를 가진 태그 안에 있는 menuLink 클래스 태그들의 스타일 설정*/
        text-decoration:none;                      /*링크(<a> 태그)가 가지는 기본 꾸밈 효과(밑줄 등)을 없앰*/
        color: white;                              /*폰트색을 흰색으로 설정*/
        display: block;                            /*링크를 글씨가 있는 부분 뿐만아니라 전체 영역을 클릭해도 링크가 걸리게 설정*/
        width: 150px;                              /*메뉴링크의 넓이 설정*/
        font-size: 12px;                           /*폰트 사이즈 12px로 설정*/
        font-weight: bold;                         /*폰트를 굵게*/
        font-family: "Trebuchet MS", Dotum, Arial; /*기본 폰트 적용, 시스템 폰트를 종류별로 순서대로*/
    }
                
   #topMenu .menuLink:hover {             /*topMenu 아이디를 가진 태그 안에 menuLink클래스를 가진 태그에 마우스가 over되면 스타일 설정*/
         color: red;                  /*글씨 색을 붉은색으로 설정*/
         background-color: #b88c8c;   /*배경색을 조금 더 밝은 회색으로 설정*/
   }
</style>
<html>
	<head>
		<title>Azabell Code Blog</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
	<body class="is-preload">
		<!-- top menu -->
		<nav id="topMenu">
			<ul>
				<%
				if (state == null){
				%>
					<script> 
						location.href = 'login.jsp';
					</script>
				<%	
				}else{
				%>
				<li><%= vo.getUserID() %> 회원님 반갑습니다.</li>
				<li><a class="menuLink" href="https://harmonious-aletopelta-1f2.notion.site/Azabell-feed200efd81498a973cc26718d951f2">아자벨 노션</a></li>
				<li><a class="menuLink" href="#">C언어 객체지향</a></li>
				<li><a class="menuLink" href="./logout.jsp">로 그 아 웃</a></li>
				<li><a class="menuLink" href="./modifyForm.jsp">회원 정보 수정</a>
				<li><a class="menuLink" href="#">방   명  록</a></li>
				<li><a class="menuLink" href="#">회 원 탈 퇴</a></li>
				<%
				}
				%>
			</ul>

		</nav>
		<!-- Wrapper -->
		<div id="rwapper" class="divdied">
			<section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
				<div class="content">
					<h2>반갑습니다.</h2><h1>jiwoclang</h1><h2>에 오신 것을 환영합니다.</h2>
					<div class="colorscripter-code" style="color:#010101;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#fafafa;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #e5e5e5"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#666;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:120%"><div style="line-height:120%">1</div><div style="line-height:120%">2</div><div style="line-height:120%">3</div><div style="line-height:120%">4</div><div style="line-height:120%">5</div><div style="line-height:120%">6</div><div style="line-height:120%">7</div><div style="line-height:120%">8</div><div style="line-height:120%">9</div><div style="line-height:120%">10</div><div style="line-height:120%">11</div><div style="line-height:120%">12</div><div style="line-height:120%">13</div><div style="line-height:120%">14</div><div style="line-height:120%">15</div><div style="line-height:120%">16</div><div style="line-height:120%">17</div><div style="line-height:120%">18</div><div style="line-height:120%">19</div><div style="line-height:120%">20</div><div style="line-height:120%">21</div><div style="line-height:120%">22</div><div style="line-height:120%">23</div><div style="line-height:120%">24</div><div style="line-height:120%">25</div><div style="line-height:120%">26</div><div style="line-height:120%">27</div><div style="line-height:120%">28</div><div style="line-height:120%">29</div><div style="line-height:120%">30</div><div style="line-height:120%">31</div><div style="line-height:120%">32</div><div style="line-height:120%">33</div><div style="line-height:120%">34</div><div style="line-height:120%">35</div><div style="line-height:120%">36</div><div style="line-height:120%">37</div><div style="line-height:120%">38</div><div style="line-height:120%">39</div><div style="line-height:120%">40</div><div style="line-height:120%">41</div><div style="line-height:120%">42</div><div style="line-height:120%">43</div><div style="line-height:120%">44</div><div style="line-height:120%">45</div><div style="line-height:120%">46</div><div style="line-height:120%">47</div><div style="line-height:120%">48</div><div style="line-height:120%">49</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#010101;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:120%"><div style="padding:0 6px; white-space:pre; line-height:120%"><span style="color:#a71d5d">typedef</span>&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;member_name;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;school_name;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER_NAME&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;select_name_number_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;member_name;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>SET_NAME)(<span style="color:#a71d5d">struct</span>&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_name,&nbsp;<span style="color:#066de2">int</span>&nbsp;select_name_number);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>GET_NAME)(<span style="color:#a71d5d">const</span>&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_name);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>NAMEINIT)(MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;name_init);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;MEMBER_NAME;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;SCHOOL_NAME&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;select_school_number_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;school_name;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>SET_SCHOOL_NAME)(<span style="color:#a71d5d">struct</span>&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_school_name,&nbsp;<span style="color:#066de2">int</span>&nbsp;select_school_number);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>GET_SCHOOL_NAME)(<span style="color:#a71d5d">const</span>&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_school_name);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>SCHOOLINIT)(MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;school_init);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;SCHOOL_NAME;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HAKBUN_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AGE_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INIT_DATE_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OUT_DATE_;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>PRINT_DATA)(<span style="color:#a71d5d">const</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>,&nbsp;<span style="color:#a71d5d">const</span>&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_name,&nbsp;<span style="color:#a71d5d">const</span>&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_school_name);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">void</span>&nbsp;&nbsp;&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>MEMBER_SET)</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_name,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_school_name,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">const</span>&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HAKBUN,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">const</span>&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AGE,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">const</span>&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INIT_DATE,</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#a71d5d">const</span>&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OUT_DATE</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#066de2">int</span>&nbsp;&nbsp;(<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>MEMBER_GET)(<span style="color:#a71d5d">const</span>&nbsp;<span style="color:#a71d5d">struct</span>&nbsp;MEMBER<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;<span style="color:#a71d5d">this</span>,&nbsp;MEMBER_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_name,&nbsp;SCHOOL_NAME<span style="color:#ff3399"></span><span style="color:#a71d5d">*</span>&nbsp;select_school_name);</div><div style="padding:0 6px; white-space:pre; line-height:120%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#999999">/*</span></div><div style="padding:0 6px; white-space:pre; line-height:120%"><span style="color:#999999">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;&nbsp;&nbsp;&nbsp;NAME_INIT(struct&nbsp;MEMBER*&nbsp;this)</span></div><div style="padding:0 6px; white-space:pre; line-height:120%"><span style="color:#999999">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;&nbsp;&nbsp;&nbsp;SCHOOL_INIT(struct&nbsp;SCHOOL_NAME*&nbsp;this)</span></div><div style="padding:0 6px; white-space:pre; line-height:120%"><span style="color:#999999">&nbsp;&nbsp;&nbsp;&nbsp;*/</span></div><div style="padding:0 6px; white-space:pre; line-height:120%">}&nbsp;MEMBER;</div></div><div style="text-align:right;margin-top:-13px;margin-right:5px;font-size:9px;font-style:italic"><a href="http://colorscripter.com/info#e" target="_blank" style="color:#e5e5e5text-decoration:none">Colored by Color Scripter</a></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#e5e5e5;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>
				</div>	
				</section>
		</div>
			<div id="wrapper" class="divided">

				<!-- One -->
					<section class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
						<div class="content">
							<h1>Azabell Developer</h1>
							<h2>Position : System, Backend</h2>
							<p class="major"> 항상 좀 더 나은 시스템 설계와 프로그래밍을 위해 노력하는 프로그래머입니다.  </p>
							<ul class="actions stacked">
								<li><a href="#one" class="button big wide smooth-scroll-middle">Get Started</a></li>
							</ul>
						</div>
						<div class="image">
							<img src="images/banner.jpg" alt="" />
						</div>
					</section>

				<!-- Two -->
					<section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="one">
						<div class="content">
							<h2><strong>C언어</strong></h2>
							<p>C언어는 <code>현재 존재하는 언어들의 모든 근간이 되는 언어기 때문에 모국어로 두고 있습니다.</code> 그렇기 때문에 저는 다른 언어를 학습하는 데에 있어서 접근성이 좀 더 용이하다고 생각됩니다.</p>
							<p>객체지향 프로그래밍 개념의 <code>클래스</code>와 <code>상속</code>, <code>인스턴스화</code>를 함수&구조체 포인터를 활용하여 유사한 역할을 하도록 구현 할 수 있습니다.  스스로 생각하고 구현을 하였으므로 다른 패러다임도 연구하고 구현을 할 수 있는 역량이 있습니다.</p>
							<p><code>저수준 프로그래밍</code>에 관심이 많이 있습니다.</p>
							<ul class="actions stacked">
								<li><a href="#three" class="button">Learn More</a></li>
							</ul>
						</div>
						<div class="image">
							<img src="images/Clang.png" alt="" />
						</div>
					</section>

				<!-- Three -->
					<section class="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in" id="three">
						<div class="content">
							<h2><strong>어셈블리어</strong></h2>
							<p>인라인 어셈블리어를 다루면서 C언어 혹은 타언어 ( 예:<code>Rust</code>, <code>LLVM compiler</code> ) 에 이식을 할 수 있습니다. 자유롭게 다루는 정도는 아직 아니지만 우선 일을 하면서 숙련도를 키울 준비가 되어있습니다.</p>
							<p>내장 인라인 어셈블리가 아닌 어셈블리어 프로그래밍에 사용한 컴파일러 : Go tools  (http://www.godevtool.com/)</p>
							<p>어셈블리어를 기반으로 메모리 구조 이동에 대해서 더욱 잘 이해할 수 있었습니다.</p>
							<ul class="actions stacked">
								<li><a href="#four" class="button">Learn More</a></li>
							</ul>
						</div>
						<div class="image">
							<img src="images/asm.png" alt="" />
						</div>
					</section>

				<!-- Four -->
					<section class="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in" id="four">
						<div class="content">
							<h2><strong>ETC</strong></h2>
							<h3>JAVA, JSP</h3>
							<p>C언어를 깊게 학습하며 자바를 바라보았을 때 객체지향이라는 패러다임을 사용해 서비스를 구현함에 있어 자바는 C언어보다 인간친화적이며 유지보수가 정말 훌륭한 언어라는 생각이 들어 공부할 다음 언어로 선정하게 되었습니다.</p>
							<p>자바를 통하여 객체지향이라는 패러다임을 사용하여서 서비스 구현에 있어서 C언어 대비로 인간친화적인 언어이며 유지보수가 정말 훌륭하다고 판단이 되었습니다.</p>
							
							<h3>RUST</h3>
							<p><code>RUST</code>는 <code>C/C++</code> 언어의 다음 <code>대체제</code>로 불리고 있습니다. </p>
							<p><code>시스템 프로그래밍에 있어서 효율적인 업무를 위해서는 C보다는 러스트가 활용도가 높다고 판단되어 선택하였으며, 추후에 RUST를 프로젝트에서 사용할 일이 생긴다면 그때 깊게 공부할 것이며 요긴하게 잘 활용할 수 있겠다고 생각하고 있습니다.</code></p>
							
						</div>
						<div class="image">
							<img src="images/etc.png" alt="" />
						</div>
					</section>

				<!-- Five -->
					<section class="wrapper style1 align-center">
						<div class="inner">
							<h2>Project</h2>
						</div>

						<!-- Gallery -->
							<div class="gallery style2 medium lightbox onscroll-fade-in">
							
							<!--  printf 개인 프로젝트  -->
								<article>
									<a href="images/gallery/fulls/01.jpg" class="image">
										<img src="images/gallery/thumbs/01.jpg" alt="" />
									</a>
									<div class="caption">
										<h3>Prinf 내장함수 구현</h3>
										<p><code>2021년 5월경 work</code> <code>Arch Linux</code> <code>gcc</code></p>
										<ul class="actions fixed">
											<li><a href="https://github.com/Azabell1993/Linux/tree/main/Printf_built_in_function"><span class="button small">GitHub 바로가기</span></a></li>
											
										</ul>
									</div>
								</article>
								
								
								<article>
									<a href="images/gallery/fulls/02.jpg" class="image">
										<img src="images/gallery/thumbs/02.jpg" alt="" />
									</a>
									<div class="caption">
										<h3>C언어 유사 OOP 기반 구현</h3>
										<p><code>현재 계속 업데이트 중입니다.</code>  <code>Window</code>  <code>minGw64</code> <code>gcc</code></p>
										<p> C언어를 사용하여 유사 OOP 패러다임을 연구 및 구현하고 여러가지 스킬을 학습한 깃 허브 저장소입니다. 직접 객체지향을 비롯한 새로운 패러다임을 설계하는 데에 있어 메모리를 이용한 포인터 활용 부분에 있어서 많은 생각을 하고 있는 중 입니다.</p>
										<ul class="actions fixed">
											<li><a href="https://github.com/Azabell1993/ClangStructPointerExample"><span class="button small">GitHub 바로가기</span></a></li>
										</ul>
									</div>
								</article>
								
								<article>
									<a href="images/gallery/fulls/03.jpg" class="image">
										<img src="images/gallery/thumbs/03.jpg" alt="" />
									</a>
									<div class="caption">
										<h3>ASM, C언어로 OS만들기</h3>
										<p><code>개인 포트폴리오로 준비중입니다.</code></p>
										<p>내용내용</p>
										<ul class="actions fixed">
											<li><span class="button small">Details</span></li>
										</ul>
									</div>
								</article>
							</div><!-- class="gallery style2 medium lightbox onscroll-fade-in"  -->
					</section>

				<!-- Six -->
					<!-- <section class="wrapper style1 align-center">
						<div class="inner">
							<h2>강점 소개</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id ante sed ex pharetra lacinia sit amet vel massa. Donec facilisis laoreet nulla eu bibendum. Donec ut ex risus. Fusce lorem lectus, pharetra pretium massa et, hendrerit vestibulum odio lorem ipsum.</p>
							<div class="items style1 medium onscroll-fade-in">
								<section>
									<span class="icon style2 major fa-gem"></span>
									<h3>Lorem</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-save"></span>
									<h3>Ipsum</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-chart-bar"></span>
									<h3>Dolor</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-wifi"></span>
									<h3>Amet</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-cog"></span>
									<h3>Magna</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon style2 major fa-paper-plane"></span>
									<h3>Tempus</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-desktop"></span>
									<h3>Aliquam</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-sync-alt"></span>
									<h3>Elit</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-hashtag"></span>
									<h3>Morbi</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-bolt"></span>
									<h3>Turpis</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-envelope"></span>
									<h3>Ultrices</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
								<section>
									<span class="icon solid style2 major fa-leaf"></span>
									<h3>Risus</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui turpis, cursus eget orci amet aliquam congue semper. Etiam eget ultrices risus nec tempor elit.</p>
								</section>
							</div> 
						</div>
					</section>
 				-->
 				
				<!-- Seven -->
					<section class="wrapper style1 align-center">
						<div class="inner medium">
							<h2>Get in touch</h2>
							<form method="post" action="#">
								<div class="fields">
									<div class="field half">
										<label for="name">Name</label>
										<input type="text" name="name" id="name" value="" />
									</div>
									<div class="field half">
										<label for="email">Email</label>
										<input type="email" name="email" id="email" value="" />
									</div>
									<div class="field">
										<label for="message">Message</label>
										<textarea name="message" id="message" rows="6"></textarea>
									</div>
								</div>
								<ul class="actions special">
									<li><input type="submit" name="submit" id="submit" value="Send Message" /></li>
								</ul>
							</form>

						</div>
					</section>

				<!-- Footer -->
					<footer class="wrapper style1 align-center">
						<div class="inner">
							<ul class="icons">
								<li><a href="#" class="icon brands style2 fa-paper-plane"><span class="label">Naver Blog</span></a></li>
								<li><a href="#" class="icon brands style2 fa-youtube"><span class="label">Youtube</span></a></li>
								<li><a href="#" class="icon style2 fa-envelope"><span class="label">Email</span></a></li>
							</ul>
							<p>&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
						</div>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>

	</body>
</html>