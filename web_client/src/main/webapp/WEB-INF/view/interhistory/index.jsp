<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>我的积分</title>
<%@ include file="/WEB-INF/view/inc/inc.jsp" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="<%=rootPath %>css/public.css" />
<link rel="stylesheet" href="<%=rootPath %>css/product.css" />
<link rel="stylesheet" href="<%=rootPath %>css/account.css" />
<script src="<%=rootPath %>js/jquery.min.js" type="text/javascript"></script>
<script src="<%=rootPath %>js/core.js"></script>
<script language="javaScript"> 
$(document).ready(function () {
	now = new Date();
	hour = now.getHours();
	if(hour < 6){$("#category_time").append("凌晨");} 
	else if (hour < 9){$("#category_time").append("早上");} 
	else if (hour < 12){$("#category_time").append("上午");} 
	else if (hour < 14){$("#category_time").append("中午");} 
	else if (hour < 17){$("#category_time").append("下午");} 
	else if (hour < 19){$("#category_time").append("傍晚");} 
	else if (hour < 22){$("#category_time").append("晚上");} 
	else {$("#category_time").append("夜里");} 
});
</script>
</head>
  
<body>
<!--头部开始-->
<%@ include file="/WEB-INF/view/inc/top.jsp" %>
<!--头部下搜索框-->
<%@ include file="/WEB-INF/view/user/inc/top.jsp" %>		 
<!--nav开始-->
<%@ include file="/WEB-INF/view/user/inc/nav.jsp" %>	

<!--个人中心-->
<div class="w1200">
	<div class="usercenter">
		<div class="position">
			<a href="#"><strong>我的积分</strong></a><span></span><a href="#">积分总览</a>
		</div>
        <!--会员中心左边导航-->
		<%@ include file="/WEB-INF/view/user/inc/left.jsp" %>
        <div class="user-info fr">
        	<!--账户余额-->
            <div class="store">
            <p class="account-money">
                   	总积分：<strong>${memberinter.credit_sum }</strong>
                   	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   	冻结积分:<strong>${memberinter.credit_freeze }</strong>
                </p>
                <sf:form method="post" action="interhistory/index.action" id="queryForm" modelAttribute="interhistoryQueryForm">
                <div class="store-tab">
                	<sf:hidden path="credit_action" id="credit_action" />
                    <a <c:if test="${empty interhistoryQueryForm.credit_action }">class="active"</c:if> onclick="document.getElementById('credit_action').value='';document.getElementById('queryForm').submit();">全部记录<span></span></a>
                    <a <c:if test="${interhistoryQueryForm.credit_action == '0' }">class="active"</c:if> onclick="document.getElementById('credit_action').value='0';document.getElementById('queryForm').submit();">订单支付记录<span></span></a>
                    <a <c:if test="${interhistoryQueryForm.credit_action == '1' }">class="active"</c:if> onclick="document.getElementById('credit_action').value='1';document.getElementById('queryForm').submit();">商品评价记录<span></span></a>
                </div>
                <div class="store-list" id="store-show">
                    <div>
                        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="account-cust-msg">
                            <tbody>
                            <tr>
                                <td width="220" align="center" bgcolor="#f5f5f5">
                                	<sf:select path="in_date_range" onchange="document.getElementById('queryForm').submit();">
                                		<sf:option value="1">三个月以内</sf:option>
                                		<sf:option value="-1">三个月以外</sf:option>
                                	</sf:select>
								</td>
                                <td width="80" align="center" bgcolor="#f5f5f5">积分存入</td>
                                <td width="80" align="center" bgcolor="#f5f5f5">积分支出</td>
                                <td width="80" align="center" bgcolor="#f5f5f5">剩余积分</td>
                                <td width="80" align="center" bgcolor="#f5f5f5">类型</td>
                                <td bgcolor="#f5f5f5" align="center">明细</td>
                            </tr>
                            <c:forEach items="${pageResult.list}" var="item">
                            <tr style="text-align:center;">
                            	<td>
                            		<fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${item.in_date }" />
                            	</td>
                            	<td>
                            		<c:if test="${(item.credit_in < 0) or (item.credit_in > 0)}">${item.credit_in }</c:if>
                            		<c:if test="${not ((item.credit_in < 0) or (item.credit_in > 0))}">-</c:if>
                            	</td>
                            	<td>
                            		<c:if test="${(item.credit_out < 0) or (item.credit_out > 0)}">${item.credit_out }</c:if>
                            		<c:if test="${not ((item.credit_out < 0) or (item.credit_out > 0))}">-</c:if>
                            	</td>
                            	<td>
                            		${item.credit_remain }
                            	</td>
                            	<td>
                            		<c:if test="${item.credit_action=='0' }">订单支付</c:if>
                            		<c:if test="${item.credit_action=='1' }">商品评价</c:if>
                            		
                            	</td>
                            	<td>
                            		${item.reason }
                            	</td>
                            </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </div>
                    <div class="page">${pageBar}</div>
                </div>
                </sf:form>
            </div>
        </div>
	</div>
</div>

<div class="clearfix"></div>
<!--底部-->
<%@ include file="/WEB-INF/view/inc/footer.jsp" %>
</body>
</html>
