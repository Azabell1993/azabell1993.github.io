<%@page import="AzabellBlog.MemberVO"%>
<%@page import="AzabellBlog.MemberDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import ="AzabellBlog.MemberDAO" %>
<%@ page import ="java.io.PrintWriter" %>
<%  request.setCharacterEncoding("UTF-8");%>
<%
	String userID = request.getParameter("userID");
	String userPassword = request.getParameter("userPassword");
	MemberDAO dao = new MemberDAO();
	MemberVO vo = dao.selectOne(userID);
%>
<jsp:useBean id="AzabellBlog"  class="AzabellBlog.MemberVO" scope="page"/>
<jsp:setProperty name="AzabellBlog" property="userID"/>
<jsp:setProperty name="AzabellBlog" property="userPassword"/>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Azabell Code Blog Login</title>
</head>
<body>
	<%
		if( vo == null){
			out.println("<h1>아이디가 틀렸거나 회원이 존재하지 않습니다.</h1>");
		}else if(!vo.getUserPassword().equals(userPassword)){
			out.println("<h1>아이디는 존재하지만 비밀번호가 일치하지 않습니다.</h1>");
		}else{
			out.println("<h1>로그인 성공했습니다...</h1>");
			session.setAttribute("userInfo", vo);
			session.setAttribute("login", "success");
		}
	%>
	
	<%
		MemberDAO memDAO = new MemberDAO();
		int result = memDAO.login(AzabellBlog.getUserID(), AzabellBlog.getUserPassword());
		if( result == 1) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("location.href = 'index.jsp'");
			script.println("</script>");
		}
		else if( result == 0) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('비밀번호가 틀립니다.')");
			script.println("history.back()");
			script.println("</script>");
		}
		else if( result == -1) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('존재하지않는 아이디입니다.')");
			script.println("history.back()");
			script.println("</script>");
		}
		else if( result == -2) {
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('데이터베이스 오류가 발생했습니다.')");
			script.println("history.back()");
			script.println("</script>");
		}
	%>
</body>