<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/outapi/movie/tag.jsp" %>
<header>
	<div class="header margin-center">
    	<div class="movPos-btn fl" id="movieImg"><a href="<c:url value="/movie.action" />"><img src="<c:url value="/inc/outapi/movie/images/mov-pos.png" />" /></a></div>
        <div class="mov-pos"><a href="<c:url value="/movie/areas.action" />">${movie_user_selected_area.name }<b></b></a></div><span class=" mov-tit">电影票</span>
        <div class="header-btn2 fr">
        <a style="visibility:hidden;" href="<c:url value="/user/uccenter.action" />"><img src="<c:url value="/inc/outapi/movie/images/mov-user.jpg" />" /></a>
        <a href="<c:url value="/" />"><img src="<c:url value="/inc/outapi/movie/images/mov-home.jpg" />" /></a></div>
    </div>
</header>
