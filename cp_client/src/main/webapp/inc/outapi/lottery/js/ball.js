var lotteryCategory;
var lotteryObj;
var maxAmount = 20000;// ���Ͷע���
var ssqLotteryObj;
var ssq_select_type = [ "��׼Ͷע", "��ʽͶע", "����Ͷע" ];

var fc3d_select_type = [ "ֱѡ", "����", "����" ];
var pl3_select_type = [ "ֱѡ", "����", "����" ];
var dlt_select_type = [ "��׼Ͷע", "����Ͷע", "��Ф��" ];
var xssc_select_type = ["","һ��ֱѡ","����ֱѡ","����ֱѡ","����ֱѡ","����ֱѡ","","","","","������ѡ","��С��˫","����ͨѡ","��ѡһ","��ѡ��","��������","��������","","","","","���Ǻ�ֵ","����ֱѡ��ֵ","������ѡ��ֵ"];
var k3_select_type = ["","��ֵ","��ͬ�ŵ�ѡ","��ͬ�Ÿ�ѡ","��ͬ�ŵ�ѡ","��ͬ��ͨѡ","����ͬ��","����ͬ��","������ͨѡ"];

var lotteryCategoryList = {
	"SSQ" : 1, // ˫ɫ��
	"3D" : 2, // 3D
	"QLC" : 3, // ���ֲ�
	"DLT" : 4, // ����͸
	"PL3" : 5, // ����3
	"PL5" : 6, // ����5
	"QXC" : 7, // ���ǲ�
	"SXL" : 8, // ��Ф��
	"XSSC": 1002, //��ʱʱ��
	"K3" :  1004,  //����
	"JCZQ" : 301  //��������
};

/** �������ͻ��Lottery */
function createLotteryObj(type) {	
	lotteryCategory = type;
	var jsonstr = sessionStorage.getItem("lottery_" + lotteryCategory);
	var xsscInfos = sessionStorage.getItem("xsscInfos");
	var jczq_matchinfo = sessionStorage.getItem("jczq_matchinfo");
	if (!!jsonstr) {
		createObj = function() {
			lotteryObj = JSON.parse(jsonstr);
			if (type == 1002 && !!xsscInfos) {
				var xsscInfosStr = JSON.parse(xsscInfos);
				for(var i=0; i < xsscInfosStr.length; i++) {
					var item = {
							"type":xsscInfosStr[i].type,
							"wan":xsscInfosStr[i].balls5,
							"qian":xsscInfosStr[i].balls4,
							"bai":xsscInfosStr[i].balls3,
							"shi":xsscInfosStr[i].balls2,
							"ge":xsscInfosStr[i].balls1,
							"zu":xsscInfosStr[i].balls0,
							"totalstake":xsscInfosStr[i].count
						};
					addLotteryItem(item);
				}
			    sessionStorage.removeItem("xsscInfos");
			    if(lotteryObj.lottery.length > 1){
			    	sessionStorage.setItem("xsscType", lotteryObj.lottery[lotteryObj.lottery.length-1].type);	
			    }else{
			    	sessionStorage.setItem("xsscType", 5);
			    }
			    			
			}
			return lotteryObj;
		};
		return createObj();
	}else if(!!xsscInfos && type == 1002) {
		createObj = function() {
			lotteryObj = {
					"count" : 0, // ע������
					"orderType" : 0, // ׷��
					"multiple" : 1, // ����
					"lottery" : [],
					"appendissue" : {
						"nums" : 1,
						"shownums" : 5,
						"stopflag" : 1,
						"stopaward" : 0,
						"appendissueinfo" : []
					}
			    };
			var xsscInfosStr = JSON.parse(xsscInfos);
			for(var i=0; i < xsscInfosStr.length; i++) {
				var item = {
						"type":xsscInfosStr[i].type,
						"wan":xsscInfosStr[i].balls5,
						"qian":xsscInfosStr[i].balls4,
						"bai":xsscInfosStr[i].balls3,
						"shi":xsscInfosStr[i].balls2,
						"ge":xsscInfosStr[i].balls1,
						"zu":xsscInfosStr[i].balls0,
						"totalstake":xsscInfosStr[i].count
					};
				addLotteryItem(item);
			}
		    sessionStorage.removeItem("xsscInfos");
		    sessionStorage.setItem("xsscType", lotteryObj.lottery[lotteryObj.lottery.length-1].type);			
			return lotteryObj;
		};
		return createObj();
	}else if (type == 1004){		
		createObj = function() {
			if( jsonstr === null || jsonstr === undefined){
				lotteryObj = new Lottery.K3({});
			}else{				
				lotteryObj = JSON.parse(jsonstr);
			}
			return lotteryObj;
		};
		return createObj();
	}else if (type == 301){
		createObj = function() {
			if(jczq_matchinfo === null || jczq_matchinfo === undefined){
				lotteryObj = new Lottery.Jczq({});
			}else{				
				lotteryObj = JSON.parse(jczq_matchinfo);
			}
			return lotteryObj;
		};
		return createObj();		
	}
	createObj = function() {
		lotteryObj = {
			"count" : 0, // ע������
			"orderType" : 0, // ׷��
			"multiple" : 1, // ����
			"lottery" : [],
			"appendissue" : {
				"nums" : 1,
				"shownums" : 5,
				"stopflag" : 3,
				"stopaward" : 0,
				"appendissueinfo" : []
			}
		};
		return lotteryObj;
	};
	return createObj();
}

/** ����һ���ն��� */
function createNullLotteryObj() {
	createNullObj = function() {
		ssqLotteryObj = {
			"count" : 0, // ע������
			"orderType" : 0, // ׷��
			"multiple" : 1, // ����
			"lottery" : [],
			"appendissue" : {
				"nums" : 1,
				"shownums" : 5,
				"stopflag" : 3,
				"stopaward" : 0,
				"appendissueinfo" : []
			}
		};
		return ssqLotteryObj;
	};
	return createNullObj();
}

function refreshLottery() {
	sessionStorage.setItem("lottery_" + lotteryCategory, JSON
			.stringify(lotteryObj));
}

function addLotteryItem(item) {
//	for (var i in item){
//		alert(i + "||" + item[i]);
//	} 
	if(lotteryCategory == 1004){
		lotteryObj.infos.push(item);
	}else{
		lotteryObj.count += 1;
		item["num"] = lotteryObj.count;
		lotteryObj.lottery.push(item);			
	}	
	refreshLottery();
}

function removeLottery(lotteryCategory) {
	sessionStorage.removeItem("lottery_" + lotteryCategory);
}

/* preHTMLҳ�� */
function precardHtml() {
	var str;
	if (lotteryCategory == 1) { // ˫ɫ��
		str = getPreSSQCardHtml(true);
	} else if (lotteryCategory == 2) { // ����3D
		str = getPreFC3DCardHtml(true);
	} else if (lotteryCategory == 4) { // ����͸
		str = getPreDLTCardHtml(true);
	} else if (lotteryCategory == 5) {
		str = getPrePL3CardHtml(true);
	}else if(lotteryCategory==6){ // ������
		str = getPrePL5CardHtml(true);
	}else if(lotteryCategory == 7){
		str = getPreQXCCardHtml(true);
	} else if(lotteryCategory == 1002) {
		str = getPreXSSCCardHtml(true);
	}
	$("#cardInfo").html(str);
	$("#cardInfo").css("height", "auto");
	

	
	if (!isstake()) {// ���û���κ�Ͷע
		
		$("#sub_btn").hide();
		$("#wrapper2").height(1);
		$("#numInfo").height(1);
	} else {
		$("#sub_btn").show();
		if(lotteryObj.lottery.length==1) {
			$("#numInfo").height(90);
			$("#wrapper2").height(85);			
		} else if (lotteryObj.lottery.length==2) {
			$("#numInfo").height(180);
			$("#wrapper2").height(175);
		} else {
			$("#numInfo").height(230);
			var platform = navigator.platform;
			if (platform == "iPod" || platform == "iPhone" || platform == "iPad") {
				$("#numInfo").height(250);
				$("#wrapper2").height(245);
			} else {
				$("#wrapper2").height(223);
			}			
		}
	}
	if(lotteryCategory == 1002 && "�����¿���" == $("#issueNameId_1002").text()) {
		$("#sub_btn").hide();
	}
}

/* ȷ��HTMLҳ�� */
function confirmcardHtml(isFour) {
	var str;
	if (lotteryCategory == 1) { // ˫ɫ��
		str = getPreSSQCardHtml(false, isFour);
	} else if (lotteryCategory == 2) { // ˫ɫ��
		str = getPreFC3DCardHtml(false, isFour);
	} else if (lotteryCategory == 4) { // ����͸
		str = getPreDLTCardHtml(false, isFour);
	} else if (lotteryCategory == 5){
		str = getPrePL3CardHtml(false, isFour);//������
	}else if(lotteryCategory == 6){// ������
		str = getPrePL5CardHtml(false,isFour);
	}else if(lotteryCategory == 7){
		str = getPreQXCCardHtml(false, isFour);
	}else if(lotteryCategory == 1002) {
		str = getPreXSSCCardHtml(false, isFour);
	}else if (lotteryCategory == 1004) {
		str = getPreK3CardHtml(false, isFour);
	}else if (lotteryCategory == 301) {
		str = getPreJczqCardHtml(false, isFour);
	}
	return str;
}

function getPreJczqCardHtml(show, isFour) {
	var arr = [];
	var elements_1 = (lotteryObj.match.elements[0]).value;
	var elements_2 = (lotteryObj.match.elements[1]).value;
	arr.push("<li class=\"nopadding\"><p>2��1 ʤƽ������</p><ul class=\"two-row\">");
	arr.push("<li class=\"w-50\">���� vs �Ͷ�</li>");
	arr.push("<li class=\"w-50 n-b\">Ͷע</li>");
	arr.push("<li class=\"w-50 height75\" style=\"line-height:18px;\">");
	arr.push(elements_1[0].split("-")[0]);
	arr.push("<br/>vs<br/>");
	arr.push(elements_1[0].split("-")[1]);
	if(elements_1.length == 2){
		arr.push("<li class=\"w-50 height75\" style=\"line-height:28px;\">");
	} else if(elements_1.length == 3){
		arr.push("<li class=\"w-50 height75\" style=\"line-height:18px;\">");
	} else {
		arr.push("<li class=\"w-50 height75\" style=\"line-height:55px;\">");
	}
	var str = [];
	for ( var i = 0; i < elements_1.length; i++) {
		str.push(elements_1[i].split("-")[2]);
	}
	arr.push(((str.sort(function(x, y){if (x > y)return -1;if (x < y)return 1;})).join("<br/>")).replace("3", "��ʤ").replace("1", "ƽ��").replace("0", "��ʤ"));
	arr.push("</li>");
	arr.push("<li class=\"w-50 height75\" style=\"line-height:18px;\">");
	arr.push(elements_2[0].split("-")[0]);
	arr.push("<br/>vs<br/>");
	arr.push(elements_2[0].split("-")[1]);
	if(elements_2.length == 2){
		arr.push("<li class=\"w-50 height75\" style=\"line-height:28px;\">");
	} else if(elements_2.length == 3){
		arr.push("<li class=\"w-50 height75\" style=\"line-height:18px;\">");
	} else {
		arr.push("<li class=\"w-50 height75\" style=\"line-height:55px;\">");
	}
	str = [];
	for ( var i = 0; i < elements_2.length; i++) {
		str.push(elements_2[i].split("-")[2]);
	}
	arr.push(((str.sort(function(x, y){if (x > y)return -1;if (x < y)return 1;})).join("<br/>")).replace("3", "��ʤ").replace("1", "ƽ��").replace("0", "��ʤ"));
	arr.push("</li></ul></li>");
	return arr.join("");
}

/* pre�ܽ�� */
function pretotalHtml() {
	var totalstake = caltotalstake();
	var orderType = $("input[name='orderType']:checked").val();
	$("#totalstakes").html(
			"��" + totalstake + "ע����<span class=\"red\">��"
					+ caltotalpay(totalstake, orderType) + ".00</span>Ԫ");
}

function calsinglePay(totalstake, multiple) {
	return parseInt(multiple) * totalstake * 2;
}

function caltotalpay(totalstake, orderType) {
	return caltotalMulti()*caltotalAppend()*totalstake*2;	
}

/** �Ƿ��Ѿ�Ͷע */
function isstake() {
	return lotteryObj.lottery.length != 0;
}

function preAppendHtml() {
	var totalstake = caltotalstake();
	var orderType = $("input[name='orderType']:checked").val();
	var total = 0;
	if (orderType == 0) {
		return parseInt(lotteryObj.multiple) * totalstake * 3;
	} else { // ׷��
		var countNum = 0;
		var appendissueinfo = lotteryObj.appendissue.appendissueinfo;
		for ( var i = 0; i < appendissueinfo.length; i++) {
			countNum += parseInt(appendissueinfo[i].multiple);
		}
		return countNum * totalstake * 3;
	}

}
/* ������ע�� */
function caltotalstake() {
	var count = 0;	
	if(Number(lotteryCategory) == 1004){		
		for ( var i = 0; i < lotteryObj.infos.length; i++) {
			count += Number(lotteryObj.infos[i].count);
		}
	}else if(Number(lotteryCategory) == 301){
		count = lotteryObj.count;
	}else{
		for ( var i = 0; i < lotteryObj.lottery.length; i++) {
			count += Number(lotteryObj.lottery[i].totalstake);
		}
	}		
	return count;
}

/* �����ܱ���*/
function caltotalMulti(){
	var count = 1;
	if(Number(lotteryCategory) == 1004){		
		if(isNaN(lotteryObj.muitl)){
			lotteryObj.muitl = 1;
			refreshLottery();
		}else{
			count = lotteryObj.muitl;
		}
	}else if(Number(lotteryCategory) == 301){
		if(isNaN(lotteryObj.multi)){
			lotteryObj.multi = 1;
		}else{
			count = lotteryObj.multi;
		}
	}else{
		if(isNaN(lotteryObj.multiple)){
			lotteryObj.multiple =1;
			refreshLottery();
		}else{
			count = lotteryObj.multiple;
		}						
	}
	return count;
}

/* ������׷����*/
function caltotalAppend(){
	
	var count = 1;
	if(Number(lotteryCategory) == 1004){		
		if(isNaN(Number(lotteryObj.append))){
			lotteryObj.append = 1;
			refreshLottery();
		}else{
			count = lotteryObj.append;
		}
	}else if(Number(lotteryCategory) == 301){
		count = 1;
	}else{
		if(isNaN(Number(lotteryObj.appendissue.nums))){
			lotteryObj.appendissue.nums = 1;
			refreshLottery();
		}else{
			count = lotteryObj.appendissue.nums;
		}						
	}		
	return count;
}

/** ���˫ɫ�����Ϣ */
function getPreSSQCardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");
		if (item.type == 0 || item.type == 1) {// ��ʽ,��ʽ
			ss = item.red.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
		} else if (item.type == 2) {// ����
			ss = item.dan.split(",");
			arr.push("(");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k]);
				if (k != ss.length - 1) {
					arr.push(" ");
				}
			}
			arr.push(") ");
			ss = item.tuo.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
		}
		arr.push("<span class=\"blue\">");
		ss = item.blue.split(",");
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push("</span></div></div>");
		arr.push(ssq_select_type[item.type] + "[" + (item.totalstake) + "ע]");// ��ʽͶע[1ע]
		if (show) {
			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"cp-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'></li></a>");
			break;
		}
	}
	return arr.join("");
}

/**
 * ��ȡ����������Ϣ
 * @param show
 * @param isFour
 * @returns
 * 2012-10-25����10:21:35
 */
function getPrePL3CardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");
		if (item.type == 0) {// ֱѡ
			ss = item.bai.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("|<span class=\"red\">");
			ss = item.shi.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("|<span class=\"red\">");
			ss = item.ge.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("</span>");
		} else {
			ss = item.balls.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k]);
				if (k != ss.length - 1) {
					arr.push(" ");
				}
			}
		}

		arr.push("</div></div>");
		
		var touzhu_type = "";
		if(item.type == 0){
			touzhu_type = "ֱѡ��ʽ";
		}else if(item.type == 1){
			touzhu_type = "������ʽ";
		}else {
			touzhu_type = "������ʽ";
		}
		arr.push(touzhu_type + "[" + (item.totalstake) + "ע]");
		arr
				.push("<span style='float:right;width=10px;'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='float:right'>"
						+ pl3_select_type[item.type] + "</span>");
		if (show) {
//			arr.push("<a ontouchend=\"deleteLotteryItem(" + item.num
//					+ ");\" href=\"javascript:deleteLotteryItem(" + item.num
//					+ ");\" class=\"fc-del\">X</a>");
			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"fc-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr
					.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}
	}
	return arr.join("");
}

/** ��ø���3D����Ϣ */
function getPreFC3DCardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");
		if (item.type == 0) {// ֱѡ
			ss = item.bai.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("|<span class=\"red\">");
			ss = item.shi.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("|<span class=\"red\">");
			ss = item.ge.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("</span>");
		} else {
			ss = item.balls.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k]);
				if (k != ss.length - 1) {
					arr.push(" ");
				}
			}
		}

		arr.push("</div></div>");
		var touzhu_type = "";
		if(item.type == 0){
			touzhu_type = "ֱѡ��ʽ";
		}else if(item.type == 1){
			touzhu_type = "������ʽ";
		}else {
			touzhu_type = "������ʽ";
		}
		arr.push(touzhu_type + "[" + (item.totalstake) + "ע]");
		arr.push("<span style='float:right;width=10px;'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='float:right'>"
						+ fc3d_select_type[item.type] + "</span>");
		if (show) {

			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"fc-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}
	}
	return arr.join("");
}

/** ***��ô���͸����Ϣ ***** */
function getPreDLTCardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");

		if (item.type == 0) {// ��׼�淨
			ss = item.red.split(","); // ��ȡ����
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("<span class=\"blue\">");
			ss = item.blue.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("</span>");
		} else if (item.type == 1) { // �����淨
			ss = item.red_before.split(",");
			arr.push("(");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k]);
				if (k != ss.length - 1) {
					arr.push(" ");
				}
			}
			arr.push(") ");
			ss = item.red_after.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("<span class=\"blue\">");
			
			if(item.blue_before != null && item.blue_before != "") {
				//���û�к�ȥ��������ʾ 
				arr.push("(");
				ss = item.blue_before.split(",");
				for ( var k = 0; k < ss.length; k++) {
					arr.push(ss[k]);
					if (k != ss.length - 1) {
						arr.push(" ");
					}
				}
				arr.push(") ");
			}
			ss = item.blue_after.split(",");
			for ( var k = 0; k < ss.length; k++) {
				arr.push(ss[k] + " ");
			}
			arr.push("</span>");

		}
		arr.push("</div></div>");
		if (item.type == 0 && item.totalstake == 1) {
			arr.push("��׼Ͷע");
		} else if (item.type == 0 && item.totalstake > 1) {
			arr.push("��ʽͶע");
		} else if (item.type == 1) {
			arr.push("����Ͷע");
		}
		arr.push("[" + (item.totalstake) + "ע]");
		if (show) {
			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"cp-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}
	}
	return arr.join("");
}

/** ������������Ϣ */
function getPrePL5CardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");

		arr.push(item.fifth+"|"+item.forth+"|"+item.third+"|"+item.second+"|"+item.first);

		
		arr.push("</div></div>");
		
		var touzhu_type = (item.totalstake==1)?"��ʽͶע":"��ʽͶע";
		arr.push(touzhu_type + "[" + (item.totalstake) + "ע]");
		if (show) {
//			arr.push("<a ontouchend=\"deleteLotteryItem(" + item.num
//					+ ");\" href=\"javascript:deleteLotteryItem(" + item.num
//					+ ");\" class=\"cp-del\">X</a>");
			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"cp-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}
	}
	return arr.join("");
}

/**
 * 
 * ��û�����ǲʵ���Ϣ
 * 
 * @param show
 * @param isFour
 * @returns
 */
function getPreQXCCardHtml(show, isFour) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\"><div class=\"red\">");

		ss = item.first.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.second.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.third.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.forth.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.fifth.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.sixth.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}
		arr.push('| ');

		ss = item.seventh.split(',');
		for ( var k = 0; k < ss.length; k++) {
			arr.push(ss[k] + " ");
		}

		arr.push("</div></div>");
		var touzhu_type = (item.totalstake == 1) ? "��ʽͶע" : "��ʽͶע";
		arr.push(touzhu_type + "[" + (item.totalstake) + "ע]");

		if (show) {
//			arr.push("<a ontouchend=\"deleteLotteryItem(" + item.num
//					+ ");\" href=\"javascript:deleteLotteryItem(" + item.num
//					+ ");\" class=\"fc-del\">X</a>");
			arr.push("<a onclick=\"deleteLotteryItem(" + item.num + ");\" href=\"javascript:void(0)\" class=\"fc-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr
					.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}
	}
	return arr.join("");
}

function showfullInfo() {
	$("#confirmcardInfo1").hide();
	$("#confirmcardInfo2").show();
}

function getLotteryNumberList_SSQ() {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		var blue =item.blue.split(",").length;
		if (item.type == 0) {// ��ʽ
			arr.push("1:" + item.red + "|" + item.blue+"*"+item.totalstake);
		} else if (item.type == 1 &&blue<2) {// �츴ʽ
			arr.push("2:" + item.red + "|" + item.blue +"*"+item.totalstake);
		}else if(item.type ==1 &&blue>1){	//	����ʽ
			arr.push("3:" + item.red + "|" + item.blue+"*"+item.totalstake);
		} else if (item.type == 2) {//
			arr.push("4:" + item.dan + "$" + item.tuo + "|" + item.blue);
		}
	}
	return arr;
}

function getLotteryNumberList_3D() {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		if (item.type == 0) {// ֱѡ
			if (item.totalstake == 1) {
				arr.push("1:" + item.bai + "," + item.shi + "," + item.ge+"*"+item.totalstake);
			} else {
				var bai = item.bai.split(",");
				var shi = item.shi.split(",");
				var ge = item.ge.split(",");
				for ( var b = 0; b < bai.length; b++) {
					for ( var c = 0; c < shi.length; c++) {
						for ( var d = 0; d < ge.length; d++) {
							arr.push("1:" + bai[b] + "," + shi[c] + ","+ ge[d]);
						}
					}
				}
			}
		} else if (item.type == 1) {// ����
			if (item.totalstake == 1) {
				var balls = item.balls.split(",");
				arr.push("3:" + balls[0] + "," + balls[1] + "," + balls[2]+"*"+item.totalstake);
			} else {
				var balls = item.balls.split(",");
				for ( var m = 0; m < balls.length; m++) {
					for ( var n = 0; n < balls.length; n++) {
						if (m < n) {
							arr.push("3:" + balls[m] + "," + balls[n] + ","+ balls[n]);
						} else if (m > n) {
							arr.push("3:" + balls[n] + "," + balls[n] + ","+ balls[m]);
						}
					}
				}
			}
		} else if (item.type == 2) {// ��6
			var balls_array = [];
			var balls = item.balls.split(",");
			for ( var a = 0; a < balls.length; a++) {
				for ( var j = 0; j < balls.length; j++) {
					for ( var k = 0; k < balls.length; k++) {
						balls_array.push(balls[a] + "," + balls[j] + ","+ balls[k]);
					}
				}
			}
			for ( var o = 0; o < balls_array.length; o++) {// ��֤
				var ball = balls_array[o].split(",");
				if (ball[0] < ball[1] && ball[1] < ball[2]) {
					arr.push("4:" + ball[0] + "," + ball[1] + "," + ball[2]);
				}
			}
		}
	}
	return arr;
}
/**
 * @returns {Array}
 */
function getLotteryNumberList_PL3() {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		if (item.type == 0) {// ֱѡ
			if (item.totalstake == 1) {
				arr.push("0:" + item.bai + "|" + item.shi + "|" + item.ge);
			} else {
				var bai = item.bai.split(",");
				var shi = item.shi.split(",");
				var ge = item.ge.split(",");
				for ( var b = 0; b < bai.length; b++) {
					for ( var c = 0; c < shi.length; c++) {
						for ( var d = 0; d < ge.length; d++) {
							arr
									.push("0:" + bai[b] + "|" + shi[c] + "|"
											+ ge[d]);
						}
					}
				}
			}
		} else if (item.type == 1) {// ����
			if (item.totalstake == 1) {
				var balls = item.balls.split(",");
				arr.push("1:" + balls[0] + " " + balls[1] + " " + balls[2]);
			} else {
				var balls = item.balls.split(",");
				for ( var m = 0; m < balls.length; m++) {
					for ( var n = 0; n < balls.length; n++) {
						if (m < n) {
							arr.push("1:" + balls[m] + " " + balls[n] + " "
									+ balls[n]);
						} else if (m > n) {
							arr.push("1:" + balls[n] + " " + balls[n] + " "
									+ balls[m]);
						}
					}
				}
			}
		} else if (item.type == 2) {// ��6
			var balls_array = [];
			var balls = item.balls.split(",");
			for ( var a = 0; a < balls.length; a++) {
				for ( var j = 0; j < balls.length; j++) {
					for ( var k = 0; k < balls.length; k++) {
						balls_array.push(balls[a] + " " + balls[j] + " "
								+ balls[k]);
					}
				}
			}
			for ( var o = 0; o < balls_array.length; o++) {// ��֤
				var ball = balls_array[o].split(" ");
				if (ball[0] < ball[1] && ball[1] < ball[2]) {
					arr.push("2:" + ball[0] + " " + ball[1] + " " + ball[2]);
				}
			}
		}
	}
	return arr;
}


function getLotteryNumberList_DLT() {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		var type = item.type;
		if (type == 0) {// ��׼Ͷע
			// arr.push("0:" + item.red + "|" + item.blue);
			if (item.totalstake > 1) {
				arr.push("1:" + item.red + "|" + item.blue);
				//console.log("��׼��ʽ");
			} else {
				arr.push("0:" + item.red + "|" + item.blue);
				//console.log("��׼��ʽ");
			}

		} else if (type == 1) {// ����Ͷע
			if(item.blue_before == null || item.blue_before == "") {
				arr.push("2:" + item.red_before + "$" + item.red_after + "|" + item.blue_after);
			} else {
				arr.push("2:" + item.red_before + "$" + item.red_after + "|"
						+ item.blue_before + "$" + item.blue_after);
			}
		} else if (type == 2) {// ��Ф��
			// arr.push("2:" + item.dan + "$" + item.tuo + "|" + item.blue);
		}
	}
	return arr;
}

function getLotteryNumberList_PL5(){
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		if (item.type == 0) {// ��ʽ
			arr.push("0:" + item.fifth + "|" + item.forth + "|" + 
					item.third + "|" +item.second +"|" +item.first);
		} else if (item.type == 1) {// ��ʽ
			arr.push("1:" + item.fifth + "|" + item.forth + "|" + 
					item.third + "|" +item.second +"|" +item.first);
		}
	}
	return arr;	
}

/**
 */
function getLotteryNumberList_QXC() {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];
		var type = item.type;
		var str=item.first + "|" + item.second+"|"+ item.third + "|"+ item.forth + "|"+ item.fifth + "|"+ item.sixth + "|"+ item.seventh;
		if (item.totalstake > 1) {
			str="1:"+str;
		} else {
			str="0:"+str;
		}
		arr.push(str);
	}
	return arr;

}

function getLotteryNumberList() {
	var arr = [];
	var item;
	if (lotteryCategory == lotteryCategoryList.SSQ) {
		arr = getLotteryNumberList_SSQ();
	} else if (lotteryCategory == 2) {// ����3D
		arr = getLotteryNumberList_3D();
	} else if (lotteryCategory == lotteryCategoryList.DLT) { // ����͸��ʼ
		arr = getLotteryNumberList_DLT();
	} else if(lotteryCategory == lotteryCategoryList.PL3){
		arr = getLotteryNumberList_PL3();
	} else if(lotteryCategory == lotteryCategoryList.PL5){//������
		arr = getLotteryNumberList_PL5();
	} else if (lotteryCategory == lotteryCategoryList.QXC) { // ���ǲ�

		arr = getLotteryNumberList_QXC();

	} else if (lotteryCategory == lotteryCategoryList.XSSC) {
		arr = getLotteryNumberList_XSSC();
	}else if (lotteryCategory == lotteryCategoryList.K3){
		arr = getLotteryNumberList_K3();
	}else if (lotteryCategory == lotteryCategoryList.JCZQ){
		arr = getLotteryNumberList_JCZQ();
	}
	return arr.join(";");
}

function getLotteryNumberList_JCZQ() {
	var arr = [];
	var elements_1 = (lotteryObj.match.elements[0]).value;
	var elements_2 = (lotteryObj.match.elements[1]).value;
	var temp1 = "";
	var flag = false;
	var str = [];
	for ( var i = 0; i < elements_1.length; i++) {
		str.push(elements_1[i].split("-")[2]);
	}
	var emp1 = (str.sort(function(x, y){if (x > y)return -1;if (x < y)return 1;})).join(",");
	arr.push((lotteryObj.match.elements[0]).key+"-"+elements_1[0].split("-")[0]+"-"+elements_1[0].split("-")[1]+"-"+elements_1[0].split("-")[4]+"-"+emp1+"-"+elements_1[0].split("-")[5]);
	str = [];
	for ( var i = 0; i < elements_2.length; i++) {
		str.push(elements_2[i].split("-")[2]);
	}
	var emp2 = (str.sort(function(x, y){if (x > y)return -1;if (x < y)return 1;})).join(","); 
	arr.push((lotteryObj.match.elements[1]).key+"-"+elements_2[0].split("-")[0]+"-"+elements_2[0].split("-")[1]+"-"+elements_2[0].split("-")[4]+"-"+emp2+"-"+elements_2[0].split("-")[5]);
	return arr;
}

/* �Ƿ񳬳���������� */
function isMaxTotalPay(orderType) {
	var totalstake = caltotalstake();
	var talpay = caltotalpay(totalstake, orderType);
	return talpay <= maxAmount;
}


function deleteLotteryItem(num) {
	deleteLotteryItem1(num);
	precardHtml();
	pretotalHtml();

}

function deleteLotteryItem1(num){
	if(lotteryCategory == 1004){
		for ( var i = 0; i < lotteryObj.infos.length; i++) {
			if (i == num) {
				lotteryObj.infos.splice(i, 1);
				break;
			}
		}
	}else{
		for ( var i = 0; i < lotteryObj.lottery.length; i++) {
			if (lotteryObj.lottery[i].num == num) {
				lotteryObj.lottery.splice(i, 1);
				break;
			}
		}
	}
	
	sessionStorage.setItem("lottery_" + lotteryCategory, JSON.stringify(lotteryObj));	
}

function appendIssueShow() {
	var obj = lotteryObj.appendissue;
	$("#stopflag_" + obj.stopflag).attr("checked", true);
	// $("input[name='stopflag']:checked")
	if (obj.stopflag == 2) {
		$("#stopaward").val(obj.stopaward);
	}
	$("#shownums").val(obj.shownums);
	LotteryPlay.init(50);

}

function addAppendIssue(item) {
	lotteryObj.appendissue.nums += 1;
	lotteryObj.appendissue.appendissueinfo.push(item);
}

function getAppendIssue(totalStake) {
	var appendissueinfo = lotteryObj.appendissue.appendissueinfo;
	var arr = [];
	var item;
	for ( var i = 0; i < appendissueinfo.length; i++) {
		item = appendissueinfo[i];
		arr.push(item.issueid + ":" + item.issueName + ":" + item.multiple
				+ ":" + (parseInt(item.multiple) * totalStake * 2));
	}
	return arr.join(";");
}

/* ���׷������ */
function isAppendIssueNums() {
	return lotteryObj.appendissue.appendissueinfo.length > 1;
}

var LotteryPlay = {};

LotteryPlay.init = function(maxTimes) {
	LotteryPlay.maxTimes = maxTimes;
	// ׷���ڴ��޸�Ĭ���ڴ�
	var qi = 5;
	get("shownums").value = qi;
	LotteryPlay.zhuihao();
	LotteryPlay.play_switch();

};

LotteryPlay.play_switch = function() {
	if (lotteryObj.appendissue.appendissueinfo.length > 0) {
		$("#shownums").val(lotteryObj.appendissue.shownums);
		var zhuihao_box = LotteryPlay.checkboxs;
		var bei_text = getElementsByClassName(get("zhuihao_con"),
				"common-input");
		var money_text = getElementsByClassName(get("zhuihao_con"), "money");

		var totalstake = caltotalstake();
		// alert(totalstake);return;
		for ( var s = 0; s < zhuihao_box.length; s++) {
			var is_id = s + 1;
			if (get("issue_" + is_id)
					&& get("issue_" + is_id).style.display == "") {
				get("issue_" + is_id).style.display = "none";
			}
		}

		if (lotteryObj.appendissue.appendissueinfo.length == lotteryObj.appendissue.shownums) {
			get("select_all_zhuihao").checked = true;
		}

		for ( var i in lotteryObj.appendissue.appendissueinfo) {
			// alert(lotteryObj.appendissue.appendissueinfo[i].issueid);
			// return;
			var p = 0;
			for ( var j = 0; j < lotteryObj.appendissue.shownums; j++) {
				var is_id = j + 1;
				get("issue_" + is_id).style.display = "";
				// if (zhuihao_box[j].type == "checkbox") {
				var input = bei_text[j + 1];
				var text = money_text[j];
				if (!zhuihao_box[j].checked) {
					p += 1;
					// alert(zhuihao_box[j].value==lotteryObj.appendissue.appendissueinfo[i].issueid);
					if (zhuihao_box[j].value == lotteryObj.appendissue.appendissueinfo[i].issueid) {
						zhuihao_box[j].checked = "checked";
						input.disabled = "";
						input.value = lotteryObj.appendissue.appendissueinfo[i].multiple;
						text.innerHTML = "��"
								+ calsinglePay(totalstake, input.value) + ".00";
						// break;
					} else {
						input.disabled = "disabled";
						input.value = '';
						text.innerHTML = "��0.00";
					}
					/*
					 * }else{ input.disabled = "disabled"; input.value = '';
					 */
				}
			}
		}
	} else {
		LotteryPlay.change_issue();
	}

	// get("select_all_zhuihao").checked = true;
	// alert(lotteryObj.appendissue.shownums);
	// alert(LotteryPlay.checkboxs);
};

LotteryPlay.zhuihao = function() {
	LotteryPlay.checkboxs = [];
	/*
	 * if (get("stop_set")) { get("stop_award").onkeyup = function () {
	 * this.value = this.value.replace(/[^0-9.]/g, ''); if (this.value < 1) {
	 * this.value = ""; } }; get("stop_award").onkeydown = function () { if
	 * (this.value < 1) { this.value = ""; } }; get("stop_award").onblur =
	 * function () { this.value = this.value.replace(/[^0-9.]/g, ''); if
	 * (this.value < 1) { this.value = ""; } }; get("stop_set").onclick =
	 * function () { LotteryPlay.disable_set(this.checked); };
	 * LotteryPlay.disable_set(false); }
	 */
	get("shownums").onchange = function() {
		LotteryPlay.change_issue();
	};
	LotteryPlay.zhuihao_select();
};

LotteryPlay.change_issue = function() {
	var n = Number(get("shownums").value);
	if (n < 1) {
		return;
	}
	LotteryPlay.clear_issue();
	var zhuihao_box = LotteryPlay.checkboxs;

	var checkboxs = getElementsByClassName(get("zhuihao_con"), "issue");
	for ( var i = n + 1; i <= zhuihao_box.length; i++) {
		if (get("issue_" + i)) {
			get("issue_" + i).style.display = "none";
		}
	}
	get("select_all_zhuihao").checked = true;
	if (document.all) {
		get("select_all_zhuihao").fireEvent("onclick");
	} else {
		get("select_all_zhuihao").onclick();
	}
};

LotteryPlay.clear_issue = function(ck) {
	var zhuihao_box = LotteryPlay.checkboxs;
	for ( var i = 1; i <= zhuihao_box.length; i++) {
		if (get("issue_" + i)) {
			get("issue_" + i).style.display = "";
		}
	}
	// var check = ck ? ck : "";
	get("select_all_zhuihao").checked = true;
	if (document.all) {
		get("select_all_zhuihao").fireEvent("onclick");
	} else {
		get("select_all_zhuihao").onclick();
	}
};

LotteryPlay.per_bei = function() {
	if (get("multi").value == "") {
		return 0;
	}
	var totalStake = caltotalstake();
	return calsinglePay(totalStake, get("multi").value);
	// return Number(get("total_money").innerHTML.substr(1)) /
	// get("multi").value;
};

LotteryPlay.zhuihao_data = function() {
	var case_money = 0;
	var date_num = 0;
	var moneys = getElementsByClassName(get("zhuihao_con"), "money");
	for ( var i = 0; i < moneys.length; i++) {
		case_money += Number(moneys[i].innerHTML.substr(1));
	}
	var zhuihao_box = getElementsByClassName(get("zhuihao_con"), "issue");
	var bei_text = getElementsByClassName(get("zhuihao_con"), "common-input");
	var money_text = getElementsByClassName(get("zhuihao_con"), "money");
	var sdm = LotteryPlay.per_bei();
	for ( var i = 1; i < zhuihao_box.length; i++) {
		if (zhuihao_box[i].type == "checkbox") {
			var input = bei_text[i];
			var text = money_text[i - 1];
			if (zhuihao_box[i].checked) {
				if (input.value == "") {
					input.value = 1;
				}
				text.innerHTML = "��" + input.value * sdm + ".00";
				date_num++;
			}
		}
	}
	get("select_all_zhuihao").checked = (date_num == get("shownums").value || date_num == zhuihao_box.length - 1);

	// get("zhuihao_total").innerHTML = "����Ͷע�ܽ�<span class='red'>��" +
	// case_money + ".00</span>Ԫ [" + LotteryPlay.zhu + "ע " + date_num + "��]";
};

LotteryPlay.zhuihao_select = function() {
	var zhuihao_box = getElementsByClassName(get("zhuihao_con"), "issue");

	var bei_text = getElementsByClassName(get("zhuihao_con"), "common-input");
	// var bei_add_btn = getElementsByClassName(get("zhuihao_con"), "add");
	/* var bei_sub_btn = getElementsByClassName(get("zhuihao_con"), "reduce"); */
	var checkboxs = [];
	var inputs = [];
	var bei_adds = [];
	var bei_subs = [];
	for ( var i = 1; i < zhuihao_box.length; i++) {
		checkboxs.push(zhuihao_box[i]);
		LotteryPlay.checkboxs.push(zhuihao_box[i]);
		inputs.push(bei_text[i]);
		// bei_adds.push(bei_add_btn[i]);
		// bei_subs.push(bei_sub_btn[i]);
	}
	for ( var i = 0; i < inputs.length; i++) {
		if (i == 0) {
			inputs[i].disabled = "";
			checkboxs[0].disabled = 'disabled';
		} else {
			inputs[i].disabled = "disabled";
		}
	}

	var moneys = getElementsByClassName(get("zhuihao_con"), "money");
	for ( var i = 0; i < checkboxs.length; i++) {
		checkboxs[i].index = i;
		checkboxs[i].onclick = function() {
			var input = inputs[this.index];
			var money = moneys[this.index];
			if (this.checked) {
				var t = get("zhuihao_beitou").value;
				input.disabled = "";
				t != "" ? input.value = t : input.value = 1;
				var sdm = LotteryPlay.per_bei();
				money.innerHTML = "��" + input.value * sdm + ".00";
			} else {
				input.value = "";
				input.disabled = "disabled";
				money.innerHTML = "��0.00";
			}
			LotteryPlay.zhuihao_data();
		};
	}

	get("select_all_zhuihao").onclick = function() {
		var sdm = LotteryPlay.per_bei();
		checkboxs[0].disabled = 'disabled';
		if (this.checked) {
			for ( var i = 0; i < checkboxs.length; i++) {
				var is_id = i + 1;
				if (i + 1 <= get('shownums').value) {
					if (get("issue_" + is_id)
							&& get("issue_" + is_id).style.display == "") {
						if (!checkboxs[i].checked) {
							var input = inputs[i];
							var money = moneys[i];
							checkboxs[i].checked = "checked";
							var t = get("zhuihao_beitou").value;
							input.disabled = "";
							t != "" ? input.value = t : input.value = 1;
							money.innerHTML = "��" + input.value * sdm + ".00";
						}
					}
				} else {
					if (get("issue_" + is_id)
							&& get("issue_" + is_id).style.display == "") {
						var input = inputs[i];
						var money = moneys[i];
						checkboxs[i].checked = "";
						input.value = "";
						input.disabled = "disabled";
						money.innerHTML = "��0.00";
					}
				}
			}
		} else {
			for ( var i = 1; i < checkboxs.length; i++) {
				var input = inputs[i];
				var money = moneys[i];
				checkboxs[i].checked = "";
				input.value = "";
				input.disabled = "disabled";
				money.innerHTML = "��0.00";
			}
		}
		LotteryPlay.zhuihao_data();
	};

	var reg = /^\d{1,2}$/;
	for ( var i = 0; i < inputs.length; i++) {
		inputs[i].index = i;
		// bei_adds[i].index = i;
		// bei_subs[i].index = i;
		/*
		 * inputs[i].onkeyup = function() { input_bei(this);
		 * line_num(this.index, this.value); };
		 */
		/*
		 * inputs[i].onkeydown = function() { if (this.value < 1) { this.value =
		 * "1"; } };
		 */
		inputs[i].onblur = function() {
			input_bei(this);
			line_num(this.index, this.value);
		};
		inputs[i].onkeyup = function() {
			var o = this;
			o.value = o.value.replace(/\D/g, "");
			if (o.value == "0") {
				o.value = "1";
			} else if (o.value > 50) {
				o.value = 50;
			}
		};

		/*
		 * bei_adds[i].onclick = function() { var input = inputs[this.index]; if
		 * (reg.test(input.value) && input.value < LotteryPlay.maxTimes) {
		 * input.value++; line_num(this.index, input.value); } };
		 * bei_subs[i].onclick = function() { var input = inputs[this.index]; if
		 * (reg.test(input.value) && input.value > 1) { input.value--;
		 * line_num(this.index, input.value); } };
		 */
	}
	get("zhuihao_beitou").onkeyup = function() {
		// input_bei(this);

		var o = this;
		o.value = o.value.replace(/\D/g, "");
		if (o.value == "0") {
			o.value = "1";
		} else if (o.value > 50) {
			o.value = 50;
		}
		total_num(this.value);
	};
	/*
	 * get("zhuihao_beitou").onkeydown = function() { if (this.value < 1) {
	 * this.value = "1"; } };
	 */
	get("zhuihao_beitou").onblur = function() {
		input_bei(this);
		total_num(this.value);
	};
	/*
	 * get("zhuihao_beitou_add").onclick = function() { var input =
	 * get("zhuihao_beitou"); if (reg.test(input.value) && input.value <
	 * LotteryPlay.maxTimes) { input.value++; total_num(input.value); } };
	 * get("zhuihao_beitou_sub").onclick = function() { var input =
	 * get("zhuihao_beitou"); if (reg.test(input.value) && input.value > 1) {
	 * input.value--; total_num(input.value); } };
	 */

	function input_bei(o) {
		o.value = o.value.replace(/\D/, "");
		if (isNaN(o.value) || o.value < 1) {
			o.value = "1";
		}
		if (o.value > LotteryPlay.maxTimes) {
			o.value = LotteryPlay.maxTimes;
		}
	}
	function line_num(index, n) {
		var sdm = LotteryPlay.per_bei();
		moneys[index].innerHTML = "��" + n * sdm + ".00";
		LotteryPlay.zhuihao_data();
	}

	function total_num(n) {
		var sdm = LotteryPlay.per_bei();
		for ( var i = 0; i < inputs.length; i++) {
			if (checkboxs[i].checked) {
				inputs[i].value = n;
				moneys[i].innerHTML = "��" + n * sdm + ".00";
			}
		}
		LotteryPlay.zhuihao_data();
	}
};

function alertTip(title) {
	tipTitle = title;
	getTip();
}

function noticeTip(title) {
    tipTitle = title;
    getTip(false);
}

// �ж���Ļ�Ƿ���ת
function orientationChange() {
	if (document.getElementById("tipOuter")) {
		$("#tipOuter").remove();
		getTip();
	}

	if ($("#indexTipOuter").is(":visible")) {
		$("#indexTipOuter").hide();
		getIndexTip();
		return false;
	}

}

function getTip(isNeedConfirm) {

     if(isNeedConfirm == undefined || isNeedConfirm == null) {
         isNeedConfirm = true;
     }


	$("body").find("#tipOuter").remove().end().css("opacity", "0.8").css("overflow", "hidden")
			.append(
					"<div class='tipOuter' id='tipOuter' style=' background-color:rgba(0,0,0,0.8)' ontouchmove='preventMove(event)'>"
							+ "<div class='tip' style='padding:10px;font-size: 14px;border-radius:6px;border:1px solid #b5b5b5;background-color:#eee;color: #848382;' id='tip'>"
							+ "<div class='title' style='float: left;clear: both;padding-top: 0px;'>��ʾ��</div><div class='content'>"
							+ "<div align='center' style='color: #333;clear: both;padding-top: 5px;padding-bottom: 5px;'>"
							+ tipTitle
							+ "</div>"
							+ "</div>"
							+ "<div class='tipbutton'>"
							+ "<div class='buttondiv' align='center'>"
							+ (isNeedConfirm ? "<input type='button' value='ȷ��' id='sure' style='border:1px solid #b40e0e;background:#d62323;background:-webkit-gradient(linear,left top, left bottom,from(#ed3131), to(#be1313));background:-moz-linear-gradient(top, #ed3131, #be1313);color:#fffwidth:50px'/>" : "")
							+ "</div>" + "</div>" + "</div>" + "</div>");
	$("#tipOuter").show();
	var x = $(window).width();
	var y = $(window).height();
	var div_x = $("#tip").width();
	var div_y = $("#tip").height();
	var pos_x = Math.ceil((x - div_x) / 2);
	var pos_y = Math.ceil((y - div_y) / 2);

	$("#tip").css('left', pos_x);
	$("#tip").css('top', pos_y);

	$("#sure").click(function() {
		$("body").css("opacity", "1").css("overflow", "auto");
		$("#tipOuter").remove();
	});

}

function preventMove() {
	event.preventDefault();
}

// ����¼�����
addEventListener('load', function() {
	orientationChange();
	window.onorientationchange = orientationChange;
});

// ���������������ڼ��user-agent,�Ծ����Ƿ���ʾҡһҡ
function check(reg) {
	var ug = navigator.userAgent.toLowerCase();
	return reg.test(ug);
}

function checkBrowser() {
	var ug = navigator.userAgent.toLowerCase();
	
	//�ͻ�����Ƕ�����3.6�Ժ�UA�޸ĳɣ�jdapp;android;3.7.0;4.3;357177051784903-400E850A85C1 ��Ҫ�������� 
	// ����Ƿ�����android�ֻ�
	var isChrome = check(/android/);
	if (isChrome) {
		var ver = ug.match(/android\s\d{1,}[.\d{1,}]*/);
		var verApp = ug.match(/android;\d{1,}[.\d{1,}]*/);
		if (ver || verApp) {
			return true;
		}
	}

	// ���safari���Ƿ������ֻ�
	var isSafari = check(/safari/);
	if (isSafari) {
		var ver = ug.match(/safari\/\d{1,}[.\d{1,}]*/);
		if (ver) {
			var mobile = ug.match(/mobile\/\w+?\s/);
			if (mobile) {
				return true;
			}
		}
	}
	var platform = navigator.platform;

	if (platform == "iPod" || platform == "iPhone" || platform == "iPad") {
		return true;
	}

	return false;
}

// ���������
function calMaxMulti(totalstake) {
	return parseInt((maxAmount / 2) / totalstake);
}

// ʱʱ��ȷ��ҳ����ʾ
function getPreXSSCCardHtml(show, isFour) {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.lottery.length; i++) {
		item = lotteryObj.lottery[i];		
		if(item.zu.length > 0) {
			item.zu.sort();
			arr.push("<li>");
			arr.push("<div style=\"padding-right:50px\">");
			arr.push("<span class=\"red\">");
			arr.push(item.zu);
			arr.push("</span></div>");
		} else {
			if(item.type == 11) {
				arr.push("<li><div style=\"padding-right:50px\">");
				var temp = (item.shi).join(",");
				temp = temp.replace("0", "��");
				temp = temp.replace("1", "С");
				temp = temp.replace("2", "��");
				temp = temp.replace("3", "˫");
				
				arr.push("<span class=\"red\">");
				arr.push(temp);
				arr.push("</span>");
				
				temp = (item.ge).join(",");
				temp = (temp).replace("0", "��");
				temp = temp.replace("1", "С");
				temp = temp.replace("2", "��");
				temp = temp.replace("3", "˫");
				
				arr.push("<span class=\"blue\">|");
				arr.push(temp);
				arr.push("</span>");
				
				arr.push("</div>");
			} else {
				arr.push("<li>");
				arr.push("<div style=\"padding-right:50px\">");
				if (item.wan.length>0) {
					item.wan.sort();
					arr.push("<span class=\"red\">");
					arr.push(item.wan);
					arr.push("</span>");
				} else if (item.type == 13 || item.type == 14){
					arr.push("<span class=\"red\">-</span>");
				}
				if(item.qian.length>0) {
					item.qian.sort();
					if(item.wan.length>0 || item.type == 13 || item.type == 14) {
						arr.push("<span class=\"blue\">|");
					} else {
						arr.push("<span class=\"blue\">");
					}
					arr.push(item.qian);
					arr.push("</span>");
				}else if (item.type == 13 || item.type == 14){
					arr.push("<span class=\"blue\">|-</span>");
				}
				
				if(item.bai.length>0) {
					item.bai.sort();
					if(item.qian.length>0 || item.type == 13 || item.type == 14) {
						arr.push("<span>|");
					} else {
						arr.push("<span>");
					}					
					arr.push(item.bai);
					arr.push("</span>");
				} else if (item.type == 13 || item.type == 14){
					arr.push("<span>|-</span>");
				}
				if (item.shi.length>0) {
					item.shi.sort();
					if(item.bai.length>0 || item.type == 13 || item.type == 14) {
						arr.push("<span class=\"red\">|");
					} else {
						arr.push("<span class=\"red\">");
					}					
					arr.push(item.shi);
					arr.push("</span>");
				}else if (item.type == 13 || item.type == 14) {
					arr.push("<span class=\"red\">|-</span>");
				}
				if(item.ge.length>0) {
					item.ge.sort();
					if(item.shi.length>0 || item.type == 13 || item.type == 14) {
						arr.push("<span class=\"blue\">|");
					} else {
						arr.push("<span class=\"blue\">");
					}
					arr.push(item.ge);
					arr.push("</span>");
				} else if (item.type == 13 || item.type == 14) {
					arr.push("<span class=\"blue\">|-</span>");
				}
				arr.push("</div>");	
			}
		
		}

		// Ͷע���ͷ�Ϊ����ֱѡ��
		var touzhu_type = xssc_select_type[item.type];
		arr.push(touzhu_type + "[" + (item.totalstake) + "ע]");
		if (show) {
			arr.push("<a ontouchend=\"deleteLotteryItem(" + item.num
					+ ");\" href=\"javascript:deleteLotteryItem(" + item.num
					+ ");\" class=\"fc-del\">X</a>");
		}
		arr.push("</li>");
		if (isFour && i == 3 &&lotteryObj.lottery.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}		
	}
	return arr.join("");
}

function getPreK3CardHtml1(item){
	var nums = "";
	var _balls1 = item.balls1;
	if (_balls1 ===null || _balls1 === undefined || _balls1.length == 0){
		return nums;
	}
	for ( var k = 0; k < _balls1.length; k++) {
		nums += _balls1[k];
		if(Number(item.type) == 3){
			nums +="*";
		}
		if (k != _balls1.length - 1) {
			nums += " ";
		}
	}
	return nums;
}

function getPreK3CardHtml2(item){
	var sub_type = item.subType;
	if(sub_type === null || sub_type === undefined || sub_type == 0){
		return getPreK3CardHtml1(item);
	}
	var nums = "";
	var _balls2 = item.balls2;
	var _balls3 = item.balls3;
	if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
		return nums;
	}
	nums += "(";
	for ( var k = 0; k < _balls2.length; k++) {
		nums += _balls2[k];
		if (k != _balls2.length - 1) {
			nums += " ";
		}
	}
	nums += ") ";
	if(_balls3.length > 0){		
		for ( var k = 0; k < _balls3.length; k++){
			nums += _balls3[k];
			if (k != _balls3.length - 1) {
				nums += " ";
			}
		}
	}	
	return nums;
}

//����ȷ��ҳ����ʾ
function getPreK3CardHtml(show, isFour) {
	var arr = [];
	var item;
	for ( var i = 0; i < lotteryObj.infos.length; i++) {		
		item = lotteryObj.infos[i];
		var type = item.type;
		arr.push("<li>");
		arr.push("<div style=\"padding-right:50px\">");
		arr.push("<span class=\"red\">");			
		
		switch (Number(type)) {
		//��ֵͶע
		case 1:
			arr.push(getPreK3CardHtml1(item));
			break;
		//��ͬ�ŵ�ѡ
		case 2:
			var _balls2 = item.balls2;
			var _balls3 = item.balls3;
			if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
				return;
			}
			for ( var k = 0; k < _balls2.length; k++) {
				arr.push( _balls2[k]);
				if (k != _balls2.length - 1) {
					arr.push(" ");
				}
			}
			if(_balls3.length > 0){
				arr.push("#");
				for ( var k = 0; k < _balls3.length; k++){
					arr.push(_balls3[k]);
					if (k != _balls3.length - 1) {
						arr.push(" ");
					}
				}
			}		
			break;
		//��ͬ�Ÿ�ѡ
		case 3:
			arr.push(getPreK3CardHtml1(item));
			break;
		//��ͬ�ŵ�ѡ
		case 4:
			arr.push(getPreK3CardHtml1(item));
			break;
		//��ͬ��ͨѡ
		case 5:
			arr.push("��ͬ��ͨѡ");
			break;
		//����ͬ��(��ѡ�����ϣ�
		case 6:
			arr.push(getPreK3CardHtml2(item));			
			break;
		//����ͬ��(��ѡ�����ϣ�
		case 7:
			arr.push(getPreK3CardHtml2(item));
			break;
		//������ͨѡ
		case 8:
			arr.push("������ͨѡ");
			break;
		default:
			break;
		}		
		arr.push("</span></div>");	
		arr.push(k3_select_type[type] + "[" + (item.count) + "ע]");		
		arr.push("</li>");
		if (isFour && i == 3 && lotteryObj.infos.length>4) {
			arr.push("<a href='javascript:showfullInfo()'><li class='ac last'><img src='../images/dmore.png' width='20' height='15'></li></a>");
			break;
		}		
	}
	return arr.join("");
}

function getLotteryNumberList_XSSC() {
	var arr = [];
	var item;
	for ( var s = 0; s < lotteryObj.lottery.length; s++) {
		item = lotteryObj.lottery[s];
		if(item.zu.length > 0) {
			arr.push(item.type + ":"+ item.zu);
		} else {
			arr.push(item.type + ":"+ (item.wan.length==0? "-":item.wan) + "|" + (item.qian.length==0? "-":item.qian) + "|" + (item.bai.length==0? "-":item.bai) + "|" + (item.shi.length==0? "-":item.shi) + "|" + (item.ge.length==0? "-":item.ge));
		}
	}
	return arr;
}

//��ע
function combine(num, n) {
    var result = [];
    var order = [];
    for (var i = 0; i <= n; i++) {
		// ע������order[0]=-1������Ϊѭ���жϱ�ʶ
        order[i] = i - 1;  
    }
    var count = 0;
    var k = n;
	// ��־�ҵ�һ����Ч���
    var flag = true;    
    while (order[0] == -1) {
		// �������Ҫ������
        if (flag) {   
            var m = [];
            for (var i = 1; i <= n; i++) {
                var nu = num[order[i]];
                m.push(nu);
            }
            result.push(m.join(" "));
            count++;
            flag = false;
        }
		// �ڵ�ǰλ��ѡ���µ�����
        order[k]++; 
		// ��ǰλ���������ֿ�ѡ������
        if (order[k] == num.length)   
        {
            order[k--] = 0;
            continue;
        }
		// ���µ�ǰλ�õ���һλ�õ�����
        if (k < n)   
        {
            order[++k] = order[k - 1];
            continue;
        }
        if (k == n) {
            flag = true;
        }
    }
    return result;
}

function getLotteryNumberList_K3() {
	var arr = [];
	var item;
	
	for ( var s = 0; s < lotteryObj.infos.length; s++) {
		item = lotteryObj.infos[s];
		var type = item.type;				
		
		switch (Number(type)) {
		//��ֵͶע
		case 1:		
			var _balls1 = item.balls1;
			var info = "";
			for( var i=0;i<_balls1.length;i++){
				info += _balls1[i];
				if (i != _balls1.length - 1) {
					info += "^";
				}
			}
			arr.push("1:3:"+info);
			break;
		//��ͬ�ŵ�ѡ ��ע
		case 2:
			var _balls2 = item.balls2;
			var _balls3 = item.balls3;
			if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
				return;
			}
			for ( var i = 0; i < _balls2.length; i++) {
				var temp1 = String(_balls2[i]).charAt(0); 
				// 1,2,
				var temp = temp1 + "," + temp1 + ","; 
				for (var j = 0; j < _balls3.length; j++){
					var temp3 = _balls3[j];
					arr.push("2:0:"+temp+temp3);
				}
			}				
			break;
		//��ͬ�Ÿ�ѡ
		case 3:			
			var _balls1 = item.balls1;
			if (_balls1 ===null || _balls1 === undefined || _balls1.length == 0){
				return;
			}
			for ( var k = 0; k < _balls1.length; k++) {
				var temp1 = String(_balls1[k]).charAt(0);
				var temp = temp1 + "," + temp1 + ","; 
				arr.push("3:0:"+temp+"255");
			}			
			break;
		//��ͬ�ŵ�ѡ
		case 4:
			var _balls1 = item.balls1;
			if (_balls1 ===null || _balls1 === undefined || _balls1.length == 0){
				return;
			}
			for ( var k = 0; k < _balls1.length; k++) {
				var temp1 = String(_balls1[k]).charAt(0);
				var temp = temp1 + "," + temp1 + ","+temp1; 
				arr.push("4:0:"+temp);
			}	
			break;
		//��ͬ��ͨѡ
		case 5:
			arr.push("5:0:255,255,255");
			break;
		//����ͬ��(��ѡ�����ϣ�
		case 6:
			var sub_type = item.subType;
			//��ѡ��ע
			if(sub_type === null || sub_type === undefined || sub_type == 0){				
				var _balls1 = item.balls1;
				if (_balls1 ===null || _balls1 === undefined || _balls1.length == 0){
					return ;
				}
				var result = combine(_balls1,2);
				for ( var i=0;i<result.length;i++){
					var temp = result[i];
					temp = temp.replace(/\s/g,",");
					arr.push("6:0:"+temp + ",255");
				}
			}else{
			//����				
				var _balls2 = item.balls2;
				var _balls3 = item.balls3;
				if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
					return ;
				}				
				for ( var k = 0; k < _balls2.length; k++) {
					var nums = "";
					nums += _balls2[k];
					if (k != _balls2.length - 1) {
						nums += ",";
					}
				}				
				if(_balls3.length > 0){
					nums += "*";
					for ( var k = 0; k < _balls3.length; k++){
						nums += _balls3[k];
						if (k != _balls3.length - 1) {
							nums += ",";
						}
					}
					arr.push("6:2:"+nums);
				}	
				
			}			
			break;
		//����ͬ��(��ѡ�����ϣ�
		case 7:
			var sub_type = item.subType;
			//��ѡ��ע
			if(sub_type === null || sub_type === undefined || sub_type == 0){				
				var _balls1 = item.balls1;
				if (_balls1 ===null || _balls1 === undefined || _balls1.length == 0){
					return ;
				}
				var result = combine(_balls1,3);
				for ( var i=0;i<result.length;i++){
					var temp = result[i];
					temp = temp.replace(/\s/g,",");
					arr.push("7:0:"+temp);
				}
			}else{
			//����				
				var _balls2 = item.balls2;
				var _balls3 = item.balls3;
				if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
					return ;
				}
				//������ע��ֻʣ��һ���������޸�
                var nums = "";
				for ( var k = 0; k < _balls2.length; k++) {
					nums += _balls2[k];
					if (k != _balls2.length - 1) {
						nums += ",";
					}
				}				
				if(_balls3.length > 0){
					nums += "*";
					for ( var k = 0; k < _balls3.length; k++){
						nums += _balls3[k];
						if (k != _balls3.length - 1) {
							nums += ",";
						}
					}
					arr.push("7:2:"+nums);
				}	
			}		
			break;
		//������ͨѡ
		case 8:
			arr.push("8:0:255,255,255");
			break;
		default:
			break;
		}
	}
	return arr;
}