<%@page import="AzabellBlog.MemberDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>
<jsp:useBean id="vo" class="AzabellBlog.MemberVO" />
<jsp:setProperty property="*" name="vo"/>     
<%
	MemberDAO dao = new MemberDAO();
	int result = dao.updateOne(vo);
	if( result == 1){
		response.sendRedirect("/index.jsp");
	}else{
		response.sendRedirect("/modifyForm.jsp");
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="" ></script>
<style>
</style>
</head>
<body>

</body>
</html>