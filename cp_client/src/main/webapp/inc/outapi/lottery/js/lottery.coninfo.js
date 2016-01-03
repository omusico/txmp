var userInfo = {};

$(document)
		.ready(
				function() {
					// Ϊ��ִ��onunload�¼�
					if (window.DeviceMotionEvent) {
						if (check(/safari/)) {
							window.addEventListener('devicemotion',
									deviceMotionHandler, false);
						}
					}
					sessionStorage.removeItem("xsscInfos");
					createLotteryObj($("#lotteryCategory").val());
					var totalStake = caltotalstake();
					$("#confirmcardInfo2").hide();
					var hasUserInfo = $("#hasUserInfo").val();
					if (hasUserInfo == 0) {
						var jsonstr = sessionStorage.getItem("lotteryUserInfo");
						if (!!jsonstr) {
							userInfo = JSON.parse(jsonstr);
							$("#fullName").val(userInfo.fullName);
							$("#idCardNumber").val(userInfo.idCardNumber);
							$("#mobile").val(userInfo.mobile);
						}
						
					}
					// ���û��Ͷע��������Ϣ����ʾ
					if (totalStake <= 0) {
						var url = $("#noStakeUrl").val();
							$("#confirmcardInfo1").html('û��Ͷע��Ϣ��<a href="' + url+ '" style="color:blue;">���</a>Ͷע').css("text-align", "center");
						if ($("#errInfo").length == 0) { // ���û����ʾ������Ϣ
							$(".mc .radius:gt(1),.mc h3:gt(1)").remove();
						} else { // �����ʾ�˴�����Ϣ
							$(".mc .radius:eq(0),.mc .radius:gt(2),.mc h3:gt(1)").remove();
						}
						$("#btns").remove();
						return;
					}
					if($("#lotteryCategory").val() == 301){
						$("#confirmcardInfo1").html(confirmcardHtml(false));
					} else {
						// չ�ֺ����б���Ϣ
						if (totalStake < 5) {
							$("#confirmcardInfo1").html(confirmcardHtml(false));
						} else {
							$("#confirmcardInfo1").html(confirmcardHtml(true));
							$("#confirmcardInfo2").html(confirmcardHtml(false));
						}
					}
					// ��֯����
					$("#lotteryNumberList").val(getLotteryNumberList());

					// ��ע��
					$("#s_totalstake").html(totalStake);
					$("#totalStake").val(totalStake);

					// ����
					$("#p_multiple").html("������" + caltotalMulti() + "��");
					$("#multi").val(caltotalMulti());

					// ׷������
					if (caltotalAppend() > 1) {
						$("#p_append").html("׷�ţ�" + caltotalAppend() + "��");
						$("#append").val(caltotalAppend());
					}
					// �ܽ��
					var lotteryTotalFee = caltotalpay(totalStake);
					$("#money").html(lotteryTotalFee + ".00");
					$("#lotteryTotalFee").val(lotteryTotalFee);
					// ͣ׷���ͣ�ֻ��1,3 �н���ͣ׷����ͣ׷
					if (lotteryCategory == 1004) {
						$("#stopflag").val(lotteryObj.appendType);
					} else if (lotteryCategory != 301) {
						$("#stopflag").val(lotteryObj.appendissue.stopflag);
					}

					// $("#appendissueinfo").val(getAppendIssue(totalStake));

					// ��� ���� ����
					var balance = $("#balance").val();
					var isBalance = true;
					var isJingbean = true;
					var jingbean = 0;
					if (!isNaN($("#jingbean").val())) {
						jingbean = $("#jingbean").val();
					} else {
						isJingbean = false;
					}

					// ׷��
					if (caltotalAppend() > 1) {
						$("#payType_4").attr("disabled", "disabled");
						$("#coupon_detail").hide();
						$("#couponTip").html("&nbsp;&nbsp;&nbsp;�Ż�ȯ�ݲ�֧��׷�Ŷ���")
								.show();
					}

					// �Ż�ȯ֧��
					var isCoupon = false;
					if ($("#coupon").val() == 1) {
						isCoupon = true;
					}
					// ����
					if (lotteryTotalFee > balance) {
						$("#payType_1").attr("disabled", "disabled");
						$("#p_payPassword").hide();
						$("#balanceNull").show();
						isBalance = false;
					}
					// ��������
					if (lotteryTotalFee * 100 > jingbean) {
						$("#payType_6").attr("disabled", "disabled");
						$("#p_payPassword").hide();
						$("#jingbeanMuch").hide();

						$("#jingbeanNull").show();
						isJingbean = false;
					}

					var disabled = $("#payType_4").attr("disabled");
					if (disabled == "disabled") {
						isCoupon = false;
					}
					if (!isBalance && !isJingbean && !isCoupon) { // ������������
						// ������
						$("#payType_2").attr("checked", true);
					} else {
						// ������
						if (isBalance) {
							$("#payType_1").attr("checked", true);
							// �Է�������
							$("#payType_1").removeAttr("disabled");
							$("#p_payPassword").show();
						}
						
						
						$("#jingbeanDesc").html("" + (lotteryTotalFee * 100));
						if (!isBalance && isJingbean) { // ��������
							$("#jingbeanMuch").show();
							$("#payType_6").attr("checked", true);
							// �Է�������
							$("#payType_6").removeAttr("disabled");
							$("#p_payPassword").show();
						}
						if (!isBalance && !isJingbean && isCoupon) {
							$("#payType_4").attr("checked", true);
							// �Է�������
							$("#payType_4").removeAttr("disabled");
							$("#coupon_detail").show();
							$("#p_payPassword").show();
						}
					}

					$('input:radio[name="lotteryOrder.payType"]').click(
							function() {
								var val = $(this).val();
								if (val != 4) {
									$("#couponNull").hide();
									$("#coupon_detail").slideUp(500);
								}
								if (val == 6) {
									$("#jingbeanMuch").show();
								} else {
									$("#jingbeanMuch").hide();
									if (val == 4) {
										$("#coupon_detail").slideDown(500);
									}
								}
								if (val != 2) { // ��������֧�� Ҫʹ��֧������
									$("#p_payPassword").show();
								} else {
									$("#p_e_payPassword").hide();
									$("#p_payPassword").hide();
								}
							});

					function deviceMotionHandler(eventData) {
						var acceleration = eventData.accelerationIncludingGravity;
					}

					// �û���
					var ele1_1 = [ "#==''", "��������Ϊ��" ];
					var ele1_2 = [ "!checkRule.ChineseName.test(#)", "������ʽ����ȷ" ];
					var ele1 = {
						"target" : '#fullName',
						"error" : '#e_fullName',
						"arr" : [ ele1_1, ele1_2 ]
					};

					// ���֤
					var ele2_1 = [ "#==''", "���֤�Ų���Ϊ��" ];
					var ele2_2 = [ "onCheckRegIDno('idCardNumber')","���֤�Ÿ�ʽ����ȷ" ];
					var ele2_3 = [ "onCheckIDnoYoung('idCardNumber')","δ��18�겻�ܹ����Ʊ" ];
					var ele2 = {
						"target" : '#idCardNumber',
						"error" : '#e_idCardNumber',
						"arr" : [ ele2_1, ele2_2, ele2_3 ]
					};

					// �ֻ���
					var ele3_1 = [ "#==''", "�ֻ��Ų���Ϊ��" ];
					var ele3_2 = [ "#!=''&&!checkRule.Mobile.test(#)",
							"�ֻ������ʽ����ȷ" ];
					var ele3 = {
						"target" : '#mobile',
						"error" : '#e_mobile',
						"arr" : [ ele3_1, ele3_2 ]
					};
					var eles = [ ele1, ele2, ele3 ];

					function checkPayPwd() {
						return true;
					}

					var subFlag = false;

					if ($("#firstType").val() == 0) {
						bindTesting(eles);
					}

					$("#payPassword").blur(function() {
						checkPayPwd();
					});

					// ʹ���Ż�ȯ����¼�
					$("input[name='lotteryOrder.couponIds']").click(
							function(event) {
								var couponType = $(this).attr(
										"data-coupon-type");
								if (couponType == 0) { // ��ȯ
									$("input[data-coupon-type='2']")
											.removeAttr("checked");
								} else { // ��ȯ
									$("input[data-coupon-type='1']")
											.removeAttr("checked");
								}
								caculateMoney($(this));
								event.stopPropagation();
							});

					var couponMoney = 0;
					var leftMoney;

					function caculateMoney(checkObj) {
						var obj = $("input[name='lotteryOrder.couponIds']:checked");
						var length = obj.length;
						var money = 0;
						obj.each(function() {
							var value = $(this).attr("data-discount");
							if ($(this).attr("data-coupon-type") == 0) {
								money += parseInt(value);
							}
						});

						if (checkObj != undefined && checkObj.attr("checked")) {
							var discount = parseInt(checkObj.attr("data-discount"));
							// �����ǰѡ��Ľ������֧��, ȡ������ѡ��
							if (money - discount >= lotteryTotalFee) { // ���ǰ�����ѡ�Ľ�����֧����ȡ����ǰ
								checkObj.attr("checked", false);
								alertTip("��ѡ�Ż�ȯ�ܽ������֧<br />��������Ҫ�����Ż�ȯ");
								money = money - discount;
							} else if (discount >= lotteryTotalFee
									&& length > 1) {
								obj.each(function() {
									$(this).attr("checked", false);
								});
								alertTip("�����Ż�ȯ������֧������<br />������Ҫʹ�������Ż�ȯ");
								checkObj.attr("checked", true);
								money = discount;
							}
							obj = $("input[name='lotteryOrder.couponIds']:checked");// ���»�ȡѡ�еĶ���
						}

						couponMoney = money;
						if (couponMoney >= lotteryTotalFee) {
							$("#couponNull").hide();
						}
						$("#couponCount").html(obj.length);
						$("#couponMoney").html(money);
					}
					$(".coupon_span").click(function(event) {
						var input = $(this).prev("input");
						var checked = input.attr("checked");
						if (checked) {
							input.attr("checked", false);
						} else {
							input.attr("checked", true);
						}
						caculateMoney(input);
						event.stopPropagation();
					});

					if ($("#couponListSize").val() == 9) {
						$("#showMore").click(function() {
							var obj = $("#couponList");
							var hide = obj.attr("data-hide");
							if (hide == 1) {
								$(".counpon_item:gt(8)").slideDown(300);
								obj.attr("data-hide", "0");
								$(this).hide();
							} else {
								$(".counpon_item:gt(8)").slideUp(300);
								obj.attr("data-hide", "1");
							}
						});
						$(".counpon_item:gt(8)").hide();
					}

					caculateMoney();
					// ��֤�Ż�ȯ����Ƿ��㹻
					function checkCoupon() {
						// �Ż�ȯ����
						if (lotteryTotalFee > couponMoney) {
							$("#couponNull").html("&nbsp;&nbsp;�Ż�ȯ����").show();
							return false;
						}

						var obj = $("input[name='lotteryOrder.couponIds']:checked");
						var length = obj.length;
						var money = 0;
						for ( var i = 0; i < length; i++) {
							var item = obj.eq(i);
							var value = item.attr("data-discount");
							var discount;
							if (item.attr("data-coupon-type") == 0) {
								discount = parseInt(value);
								if (couponMoney - discount >= lotteryTotalFee) { // �ж����ȯ
									$("#couponNull").html("&nbsp;&nbsp;��������ѡ���Ż�ȯ").show();
									return false;
								}
								if (lotteryTotalFee <= discount && length > 1) {
									$("#couponNull").html("&nbsp;&nbsp;�Ż�ȯѡ������").show();
									return false;
								}
								money += discount;
							}
						}
						return true;
					}

					$("#sub_btn").click(
									function() {
										if (($("#fullName").attr("value") && $("#fullName").attr("value").length == 0)||($("#e_fullName_2").text().length != 0 && $("#e_fullName_2").css("display") != "none"))
										 {
											$("#fullName").focus();
										} else if (($("#idCardNumber").attr("value") && $("#idCardNumber").attr("value").length == 0)|| ($("#e_idCardNumber_2").text().length != 0 && $("#e_idCardNumber_2").css("display") != "none")) {
											$("#idCardNumber").focus();
										} else if (($("#mobile").attr("value") && $("#mobile").attr("value").length == 0)|| ($("#e_mobile_2").text().length != 0 && $("#e_mobile_2").css("display") != "none")) {
											$("#mobile").focus();
										}
										if (subFlag) {
											$("#p_e_payPassword").show();
											$("#e_payPassword").html("Ϊ����������ʧ,�벻Ҫ�ظ��ύ");
											return;
										}

										if ($("#firstType").val() == 0) {
											if (!submitCheck(eles)) {
												return;
											}
										}
										if ($("#totalStake").val() < 1) {
											$("#p_e_payPassword").show();
											$("#e_payPassword").html("����δ��ע,��ѡ���������������");
											return;
										}

										var payType = $("input[name='lotteryOrder.payType']:checked").val();
										var isCouponComfirm = false;
										if (payType != 2) { // ���򾩶�֧���������ṩ֧������
											if (!checkPayPwd()) {
												return;
											}
											if (payType == 4) {
												if (!checkCoupon()) {
													return;
												}
												if (couponMoney > lotteryTotalFee) {
													getIndexTip();
													isCouponComfirm = true;
												}
											}
										}

										if (hasUserInfo == 0) {
											userInfo.fullName = $("#fullName").val();
											userInfo.idCardNumber = $("#idCardNumber").val();
											userInfo.mobile = $("#mobile").val();
											sessionStorage.setItem("lotteryUserInfo",JSON.stringify(userInfo));
										}

										if (!isCouponComfirm) {
											subFlag = true;
											$("#sub_btn").hide();
											$("#btns").html("�����ύ��...");
											var _lottery_refer = sessionStorage.getItem("lottery_refer");
											if(_lottery_refer !== null && _lottery_refer !== undefined){
												$("#referFrom").val(_lottery_refer);												
												sessionStorage.removeItem("lottery_refer");
											}
											$("#baseForm").submit();
										}
									});

					$("#cancel").click(function() {
						$("body").css("opacity", "1");
						$("#indexTipOuter").hide();
					});

					$("#indexSure").click(function() {
						$("#indexTipOuter").hide();	
						subFlag = true;
						$("#sub_btn").hide();
						$("#btns").html("�����ύ��...");
						var _lottery_refer = sessionStorage.getItem("lottery_refer");						
						if(_lottery_refer !== null && _lottery_refer !== undefined){
							$("#referFrom").val(_lottery_refer);							
							sessionStorage.removeItem("lottery_refer");
						}
						$("#baseForm").submit();
					});

					$("input").keydown(function(event) {
						if (event.keyCode == 13) {
							$("#sub_btn").click();
							return false;
						}
					});

					if ($("#usedFlag").val() == 0) {
						$("input[name='lotteryOrder.payType']")
								.each(
										function() {
											var value = $(this).val();
											if (value != 2) {
												$(this).attr("disabled",
														"disabled");
												$("#coupon_detail").hide();
												$("#balanceNull")
														.html(
																"&nbsp;&nbsp;δ������ȫ֧�����޷�ʹ��");
												$("#jingbeanNull")
														.html(
																"&nbsp;&nbsp;δ������ȫ֧�����޷�ʹ��");
												if (getOrderType($lotteryCategory) != 3) {
													$("#couponTip")
															.html(
																	"&nbsp;&nbsp;δ������ȫ֧�����޷�ʹ��")
															.show();
												}
											} else {
												$(this).attr("checked", true);
											}
										});
						$("#p_payPassword").hide();
					}

				});

/**
 * ��ȡ�µ�������
 * 
 * @param lotteryCategory
 * @returns
 */
function getOrderType(lotteryCategory) {
	var str = sessionStorage.getItem("lottery_" + lotteryCategory);
	var json = JSON.parse(str);
	return json.orderType;
}

function getIndexTip() {
	var x = $(window).width();
	var y = $(window).height();
	$("#indexTipOuter").show();
	$("body").css("overflow", "hidden");
	var div_x = $("#indexTip").width();
	var div_y = $("#indexTip").height();
	var pos_x = Math.ceil((x - div_x) / 2);
	var pos_y = Math.ceil((y - div_y) / 2);
	$("#indexTip").css('left', pos_x);
	$("#indexTip").css('top', pos_y);
}
