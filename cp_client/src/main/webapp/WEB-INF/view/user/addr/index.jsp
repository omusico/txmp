<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/view/inc/inc.jsp" %>
<title>用户中心</title>
</head>

<body>

    
    <!--头部开始-->
    <%@ include file="/WEB-INF/view/inc/top.jsp" %>
        
    <div class="module">
	    <section>
	        <div class="position mt5">
	            <a href="<%=basePath %>">首页</a> > <a href="<%=basePath %>user/uccenter.action">用户中心</a> > <a href="javascript:void(0);">收货地址管理</a>
	        </div>
	    </section>
	</div>
	
	<div class="module">
    	<section>
    	<div class="mt5">
            <div class="addr-center">
                <div class="addr-section">
                    <ul class="addr-ul">
                    
                    	<c:forEach items="${addrlist}" var="addr">
                        <li>
                            <div class="addr-tit"><span>${addr.cust_name}&nbsp;${addr.cell_phone}</span><span class="msg-time">
                            	<c:if test="${addr.is_default=='1'}"><a href="javascript:void(0);" class="addr-dft-no">默认地址</a></c:if>
                            	<c:if test="${addr.is_default=='0'}"><a href="<%=basePath %>user/addrEditDefault-${addr.addr_id}.action" class="addr-dft-no">设为默认</a></c:if>
                            </span></div>
                            <div class="addr-ct">
                                <p>${addr.area_name_str}${addr.address}</p>
                            </div>
                            <p class="addr-btn">
                            	<a href="<%=basePath %>user/addredit-${addr.addr_id}.action" class="addr-edit">修改</a>
                            	<span class="addr-btn-bar">|</span>
                            	<a href="<%=basePath %>user/addrdel-${addr.addr_id}.action" class="addr-del">删除</a></p>
                        </li>
                        </c:forEach>
                        
                    </ul>
                    <span><input type="button" class="sign_btn" value="添加新地址" onclick="window.location.href='<%=basePath %>user/addradd.action';"></span>
                </div>
    
	            </div>
	        </div>
	    </section>
	</div>
    
    <!--搜索开始-->
    <%@ include file="/WEB-INF/view/inc/search.jsp" %>

    <!--底部开始-->
    <%@ include file="/WEB-INF/view/inc/footer.jsp" %>

</body>
</html>
