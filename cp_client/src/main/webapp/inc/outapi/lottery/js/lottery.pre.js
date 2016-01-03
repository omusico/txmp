/** @author langgu 20131204 created */
/*---------------------------------------------˫ɫ��------------------------------------------------*/
// ���������¼�
	window.addEventListener('orientationchange', function() {
				setTimeout(function() {
							if ($("#shade").css("display") != "none") {								
								alertPopCenter();
								confirmPopCenter();
							}
						}, 500);
			}, false);
	
	function confirmPopCenter() {
		$('#confirmPop').css({
					left : ($(window).width() - $('#confirmPop').outerWidth()) / 2,
					top : ($(window).height() - 100) / 2 + $(document).scrollTop()
				});

		$("#shade").height($(document).height());
	}
	
	/**
	 * ������ʾ�����
	 */
	function alertPopCenter() {
		$('#alertPop').css({
					left : ($(window).width() - $('#alertPop').outerWidth()) / 2,
					top : ($(window).height() - 100) / 2 + $(document).scrollTop()
				});

		$("#shade").height($(document).height());
	}

	function _creatSSQNums(item){
		
		// ��װnums ����1��span ����1��span
		var nums = "<span style=\"padding-right:0px;\">";
		var redball ="";
		// ��ʽ,��ʽ
		if (item.type == 0 || item.type == 1) {
		
			ss = item.red.split(",");
			for ( var k = 0; k < ss.length; k++) {
				nums += ss[k] + " ";	
				redball+=ss[k]+",";			
			}
			
		} 
		// ����
		else if (item.type == 2) {
			ss = item.dan.split(",");
			nums += "(";
			for ( var k = 0; k < ss.length; k++) {
				nums += ss[k] ;
				if (k != ss.length - 1) {
					nums += " ";
				}
			}
			nums += ") ";
			ss = item.tuo.split(",");
			for ( var k = 0; k < ss.length; k++) {
				nums += ss[k] + " ";				
			}
		}
		nums += "</span>";
		nums += _spanBlue();
		ss = item.blue.split(",");
		
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
			if (k != ss.length - 1) {
				nums += " ";
			}
		}
		var blueballs =ss.length;
		var redballs =redball.substring(0, redball.length-1).split(",");
		if(redballs.length>6&&blueballs>1){
				clearAllEvent();
				deleteRow(1)
			return _returnIndexPage("δ֪���֣��������ز�Ʊ��ҳ���¹��ʣ�");
		}
		return nums;		
	}

function _creatSSQDesc(item){
	return ssq_select_type[item.type];
}

/*---------------------------------------------����3D------------------------------------------------*/

function _create3DNums(item) {	
	
	// ��װnums
	var nums = "<span style=\"padding-right:0px;\">";
	// ֱѡ
	if (item.type == 0) {			
		ss = item.bai.split(",");
        nums += "<span style='color:red;'>"
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];			
		}
		nums += "|</span><span style='color:blue;'>";
		ss = item.shi.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
		}
		nums += "|</span><span style='color:black;'>";
		ss = item.ge.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
		}
        nums += "|</span>";
	} 
	// ��ֱѡ
	else {
		ss = item.balls.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
			if (k != ss.length - 1) {
				nums += " ";
			}
		}
	}	
	nums += "</span>";		
	return nums;
}

function _creat3DDesc(item){
	if(item.type == 0){
		return "ֱѡ��ʽ";
	}else if(item.type == 1){
		return "������ʽ";
	}else {
		return "������ʽ";
	}
}

/*---------------------------------------------����͸------------------------------------------------*/

function _createDLTNums(item) {
	
	// ��װnums
	var nums = "<span style=\"padding-right:0px;\">";
	// ��׼�淨
	if (item.type == 0) {
		// ��ȡ����
		ss = item.red.split(","); 
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k] + " ";
			
		}
		nums += "</span>";
		nums += _spanBlue();
		ss = item.blue.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k] + " " ;
		
		}		
	} 
	// �����淨
	else if (item.type == 1) { 
		ss = item.red_before.split(",");
		nums += "(";
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
			if (k != ss.length - 1) {
				nums += " ";
			}
		}
		nums += ") ";
		ss = item.red_after.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k]+ " ";			
		}
		nums += "</span>";
		nums += _spanBlue();
		// ���û�к�ȥ��������ʾ wangxing
		if(item.blue_before != null && item.blue_before != "") {			
			nums += "(";
			ss = item.blue_before.split(",");
			for ( var k = 0; k < ss.length; k++) {
				nums += ss[k];
				if (k != ss.length - 1) {
					nums += " ";
				}
			}
			nums += ") ";
		}
		ss = item.blue_after.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k] + " ";
		}
	}
	nums += "</span>";	
	return nums;	
}

function _creatDLTDesc(item){
	var ret = "";	
	if (item.type == 0 && item.totalstake == 1) {
		ret = "��׼Ͷע";
	} else if (item.type == 0 && item.totalstake > 1) {
		ret = "��ʽͶע";
	} else if (item.type == 1) {
		ret = "����Ͷע";
	}	
	return ret;
}


/*---------------------------------------------������------------------------------------------------*/

function _createPL3Nums(item) {
	
	// ��װnums
	var nums = "<span style=\"padding-right:0px;\">";
	// ֱѡ
	if (item.type == 0) {
		ss = item.bai.split(",");
        nums += "<span style='color:red;'>"
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
		}
		nums += "|</span><span style='color:blue;'>";
		ss = item.shi.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
		}
        nums += "|</span><span style='color:#000000;'>";
		ss = item.ge.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
		}
        nums+="</span>"
	}
	// ��ֱѡ
	else {
		ss = item.balls.split(",");
		for ( var k = 0; k < ss.length; k++) {
			nums += ss[k];
			if (k != ss.length - 1) {
				nums += " ";
			}
		}
	}
	nums += "</span>";	
	
	return nums;
}


/*---------------------------------------------������------------------------------------------------*/

function _createPL5Nums(item) {	
	
	// ��װnums
	var nums = "<span style=\"padding-right:0px;\"><span style='color:red;'>";
	nums += item.fifth+"|</span><span style='color:blue;'>"+item.forth+"|</span><span style='color:#000000;'>"+item.third+"|</span><span style='color:red;'>"+item.second+"|</span><span style='color:blue;'>"+item.first+"</span>";
	nums += "</span>";		
	return nums;
}

function _createPL5Desc(item) {			
	return (item.totalstake == 1) ? "��ʽͶע" : "��ʽͶע";
}

/*---------------------------------------------���ǲ�------------------------------------------------*/
function _createQXCNums(item) {	
	
	// ��װnums
	var nums = "<span style=\"padding-right:0px;\">";
	ss = item.first.split(',');
    nums += "<span style='color: #ff0000'>"
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
		if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color:#0000ff'>";

	ss = item.second.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k] ;
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color:#000000'>";

	ss = item.third.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color: #ff0000'>";

	ss = item.forth.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color:#0000ff'>";

	ss = item.fifth.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color:#000000'>";

	ss = item.sixth.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "|</span><span style='color: #ff0000'>";;

	ss = item.seventh.split(',');
	for ( var k = 0; k < ss.length; k++) {
		nums += ss[k];
			if (k != ss.length - 1) {
				nums += ",";
			}
	}
	nums += "</span></span>";
		
	return nums;
}

/*---------------------------------------------��ʱʱ��------------------------------------------------*/

function _createXSSCNums(item) {
	
	// ��װnums
	var nums = "";			
	if(item.zu.length > 0) {
		item.zu.sort();
		nums += "<span style=\"padding-right:0px;\">";
		nums += item.zu;	
		nums += "</span>";	
	} else {
		if(item.type == 11) {
			nums += "<span style=\"padding-right:0px;\">";
			var temp = (item.shi).join(",");
			temp = temp.replace("0", "��");
			temp = temp.replace("1", "С");
			temp = temp.replace("2", "��");
			temp = temp.replace("3", "˫");
			nums += temp;
			nums += "</span>";
			
			temp = (item.ge).join(",");
			temp = (temp).replace("0", "��");
			temp = temp.replace("1", "С");
			temp = temp.replace("2", "��");
			temp = temp.replace("3", "˫");
			
			nums += "<span style=\"color:#00f;padding-right:0px;\">|";
			nums += temp ;	
			nums += "</span>";
		} else {			
			if (item.wan.length>0) {
				
				item.wan.sort();	
				nums += "<span style=\"padding-right:0px;\">";
				nums += item.wan;
				nums += "</span>";
				
			} else if (item.type == 13 || item.type == 14){
				nums += "<span style=\"padding-right:0px;\">";
				nums += "-";
				nums += "</span>";
			}
			if(item.qian.length>0) {
				item.qian.sort();
				if(item.wan.length>0 || item.type == 13 || item.type == 14) {
					nums += "<span style=\"color:#00f;padding-right:0px;\">|";
				} else {
					nums += _spanBlue();
				}
				nums += item.qian;
				nums += "</span>";
			}else if (item.type == 13 || item.type == 14){
				nums += "<span style=\"color:#00f;padding-right:0px;\">|-</span>";
			}
			
			if(item.bai.length>0) {
				item.bai.sort();
				if(item.qian.length>0 || item.type == 13 || item.type == 14) {
					nums += "<span style=\"color:black;padding-right:0px;\">|";
				} else {
					nums += "<span style=\"color:black;padding-right:0px;\">";
				}					
				nums += item.bai;
				nums += "</span>";
			} else if (item.type == 13 || item.type == 14){
				nums += "<span style=\"color:black;padding-right:0px;\">|-</span>";
			}
			if (item.shi.length>0) {
				item.shi.sort();
				if(item.bai.length>0 || item.type == 13 || item.type == 14) {
					nums += "<span style=\"padding-right:0px;\">|";
				} else {
					nums += "<span style=\"padding-right:0px;\">";
				}					
				nums += item.shi;
				nums += "</span>";
			}else if (item.type == 13 || item.type == 14) {
				nums += "<span style=\"padding-right:0px;\">|-</span>";
			}
			if(item.ge.length>0) {
				item.ge.sort();
				if(item.shi.length>0 || item.type == 13 || item.type == 14) {
					nums += "<span style=\"color:#00f;padding-right:0px;\">|";
				} else {
					nums += _spanBlue();
				}
				nums += item.ge;
				nums += "</span>";
			} else if (item.type == 13 || item.type == 14) {
				nums += "<span style=\"color:#00f;padding-right:0px;\">|-</span>";
			}				
		}	
	}
	
	return nums;	
}

function _creatXSSCDesc(item){	
	return xssc_select_type[item.type];
}

/*---------------------------------------------����------------------------------------------------*/
function _createK3Nums1(item){
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

function _createK3Nums2(item){
	var sub_type = item.subType;
	if(sub_type === null || sub_type === undefined || sub_type == 0){
		return _createK3Nums1(item);
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

function _createK3Nums(item) {	
	// ��װnums
	var nums = "";
	var type = item.type;	
	nums += "<span>";
	switch (Number(type)) {
	// ��ֵͶע
	case 1:
		nums += _createK3Nums1(item);
		break;
	// ��ͬ�ŵ�ѡ
	case 2:
		var _balls2 = item.balls2;
		var _balls3 = item.balls3;
		if (_balls2 ===null || _balls2 === undefined || _balls2.length == 0){
			return;
		}
		for ( var k = 0; k < _balls2.length; k++) {
			nums += _balls2[k];
			if (k != _balls2.length - 1) {
				nums += " ";
			}
		}
		if(_balls3.length > 0){
			nums +="#";
			for ( var k = 0; k < _balls3.length; k++){
				nums += _balls3[k];
				if (k != _balls3.length - 1) {
					nums += " ";
				}
			}
		}		
		break;
	// ��ͬ�Ÿ�ѡ
	case 3:
		nums += _createK3Nums1(item);
		break;
	// ��ͬ�ŵ�ѡ
	case 4:
		nums += _createK3Nums1(item);
		break;
	// ��ͬ��ͨѡ
	case 5:
		nums += "��ͬ��ͨѡ";
		break;
	// ����ͬ��(��ѡ�����ϣ�
	case 6:
		nums += _createK3Nums2(item);
		break;
	// ����ͬ��(��ѡ�����ϣ�
	case 7:
		nums += _createK3Nums2(item);
		break;
	// ������ͨѡ
	case 8:
		nums += "������ͨѡ";
		break;
	default:
		break;
	}
	
	nums += "</span>";	
	return nums;	
}

function _creatK3Desc(item){		
	return k3_select_type[item.type];
}


/** ****************************************************************************************** */

function _getCreateNumsMethod(){
	
	switch(Number(lotteryCategory))
	{
		case 1:
			return _creatSSQNums;
		  break;
		case 2:
			return _create3DNums;
		  break;
		case 4:
			return _createDLTNums;
		  break;
		case 5:
			return _createPL3Nums;
		  break;
		case 6:
			return _createPL5Nums;
		  break;
		case 7:
			return _createQXCNums;
		  break;
		case 1002:
			return _createXSSCNums;
		  break;
		case 1004:
			return _createK3Nums;
		  break;
		default:
			return  undefined;
	}	
	
}

function _getCreateDescMethod(){
	
	switch(Number(lotteryCategory))
	{
		case 1:
			return _creatSSQDesc;
		  break;
		case 2:
			return _creat3DDesc;
		  break;
		case 4:
			return _creatDLTDesc;
		  break;
		case 5:
			return _creat3DDesc;
		  break;
		case 6:
			return _createPL5Desc;
		  break;
		case 7:
			return _createPL5Desc;
		  break;
		case 1002:
			return _creatXSSCDesc;  
		  break;
		case 1004:
			return _creatK3Desc;
		  break;
		default:
			return  undefined;
	}	
	
}

function _spanBlue(){
	return "<span style=\"color:#00f;padding-right:0px;\">";
}

function _returnIndexPage(message){
	return '<a href="/xfg_cp_client//lottery/lotteryInfo.action?gameid=3" class="link-more">'+message+'</a>';
	
}

/**
 * �����б���ʾ����
 * 
 * @param type
 *            0-��ʾȫ�� 1-��ʾǰN��
 */
function _setShowType(type){
	sessionStorage.setItem("lottery_pre_show_type",type);
}

/**
 * ��ȡ�б���ʾ����
 * 
 * @returns 0-��ʾȫ�� ; 1-��ʾǰN��
 */
function _getShowType(){
	var ret = sessionStorage.getItem("lottery_pre_show_type");	
	if( ret === undefined || ret === null){		
		_setShowType(0);
		return 0;
	}else{
		return ret;
	}	
}

/**
 * ��ȡ"xע yԪ"�ı�
 * 
 * @param item
 *            lotteryObj.lottery[i]����
 * @returns {String} ����"xע yԪ"�ı�
 */
function _createTotalText(item){
	var tempStake = 0;
	var totalMoney = 0;
	if(lotteryCategory == 1004){
		tempStake = Number(item.count);		
	}else{
		tempStake = Number(item.totalstake);
	}	
	if(!isNaN(tempStake)){
		totalMoney = tempStake*2;
	}else{
		tempStake = 0;
	}
	return tempStake + "ע " + totalMoney + "Ԫ";
}

/**
 * ����"����Ͷע"����"����Ͷע�б�"�ĳ�����
 * 
 * @returns ���س�����Ƭ��
 */
function _creatMoreOrLessHref(showType){
	var ret = null;
	if (showType == 0){
		ret = '<a href="javascript:void(0)" onclick="changeShowType()" class="link-more">����Ͷע��</a>';	
	}else{
		ret = '<a href="javascript:void(0)" onclick="changeShowType()" class="link-more">����Ͷע�б�</a>';	
	}
	return ret;
}

function _notFoundMethod(){
	return undefined;
}

/**
 * ����ѡ�ź����DivƬ��
 * 
 * @param nums
 *            ѡ�ź���spanƬ��
 * @param desc
 *            ѡ�ź�����淨�����ı�
 * @param total
 *            ѡ�ź����ע���ͼ۸� "xע yԪ"�ı�
 * @param num
 *            ѡ�ź�����loterryObject�����е�λ�ã�����ɾ�����ܵ�����
 * @param notAddDel
 *            ��1��ʾ�����ɾ����ť����1�����
 * @returns {String} ����ѡ�ź����DivƬ��
 */
function _createDiv(nums,desc,total,num,notAddDel,isShow){
	var strDiv = "";
    if(isShow){
        strDiv += '<div class="new-tbl-type" id="numberrow'+ num +'">';
    }else{
        strDiv += '<div class="new-tbl-type" style="display: none;" id="numberrow'+ num +'">';
    }

	strDiv += '<div class="new-tbl-cell w80">';
	strDiv += '<div class="choose-box">';
	strDiv += '<div class="choose-num">'+nums+'</div>';
	strDiv += '<div class="total"><span>'+desc+'</span><span class="new-fr">'+total+'</span></div>';
	strDiv += '</div></div>'; 
	if( notAddDel === undefined || notAddDel !== 1){
		strDiv += '<div class="new-tbl-cell">'; 
		strDiv += '<a href="javascript:void(0);" onclick="deleteRow('+num+')" class="btn-del">ɾ��</a>'; 
		strDiv += '</div>';
	}	
	strDiv += '</div>';	
	return strDiv;
}
/**
 * 
 * @param item
 *            lotteryObj.lottery[i]����
 * @param createNumsMethod
 *            ����ѡ�ź���spanƬ�εķ�����
 * @param createDescMethod
 *            ����ѡ�ź����淨�����ı��ķ�����
 * @param notAddDel
 *            ��1��ʾ�����ɾ����ť���������1�����
 * @returns ����һ��ѡ�ź����DIVƬ��
 */
function _createDivTemplete(item,num,createNumsMethod,createDescMethod,notAddDel,isShow){
	
	if(createNumsMethod === undefined || createDescMethod === undefined){
		return "";
	}
	
	var nums = createNumsMethod(item);
	
	var desc = createDescMethod(item);
	
	var total = _createTotalText(item);	
	
	return _createDiv(nums,desc,total,num,notAddDel,isShow);
	
}

/** ******************************************public********************************************************* */




/**
 * �ı�ѡ���б���ʾ���� ��"����Ͷע"��"����Ͷע�б�"֮���л� 0-����Ͷע 1-����Ͷע�б� �ı����Ҫ���¼���ҳ��
 */
function changeShowType(){
	if (_getShowType() == 0){
		_setShowType(1);
        $("#numberInfo .new-tbl-type").each(function(index,item){
            if(index > 4){
                $(item).css("display","none");
            }
        });
        $("#numberInfo .link-more").text("����Ͷע>>");
	}else{
		_setShowType(0);
        $("#numberInfo .new-tbl-type").each(function(index,item){
            if(index > 4){
                $(item).css("display","");
            }
        });

        $("#numberInfo .link-more").text("����Ͷע�б�>>");
	}
}

/** ȷ��Ͷעҳ�����б� */
function creatPreDivList() {
	var arr = [];
	var item, ss;
	
	var arrLen = null;
	if(lotteryCategory == 1004){
		arrLen = lotteryObj.infos.length;
	}else{
		arrLen = lotteryObj.lottery.length;
	}

	var forCount = 0;
	
	var createNumsMethod = _getCreateNumsMethod();
	var createDescMethod = _getCreateDescMethod();	
	if(createNumsMethod === undefined || createDescMethod === undefined){
		return _returnIndexPage("δ֪���֣��������ز�Ʊ��ҳ���¹��ʣ�");
	}
	
	try{
		for ( var i=arrLen-1; i>=0;i--){		
			// ֻ��ʾǰ5�������"����Ͷע"�����ӣ�������ѭ��
            var isShow = true;
			if(arrLen > 5 && forCount >= 5){
                isShow = false;
			}
			var num = 0;
			if(lotteryCategory == 1004){			
				item = lotteryObj.infos[i];
				num = i;
			}else{
				item = lotteryObj.lottery[i];
				num = item.num;
			}
			
			arr.push(_createDivTemplete(item,num,createNumsMethod,createDescMethod,undefined,isShow));
			forCount++;
		}
		// ��ʾȫ���������б����5�����"�����б�"�ĳ�����
		if(arrLen > 5){
            /*Ĭ������Ϊ����*/
            _setShowType(1);
			arr.push(_creatMoreOrLessHref(0));
		}	
	}catch(e){
		alert(e.message);
	}
	
		
	return arr.join("");
}


function createPreTotalSpan(){
	var zhushu =  caltotalstake();
	var qishu = $("#issue").val();
	var beishu = $("#multi").val();
	var zong = zhushu*qishu*beishu*2;
		
	var span = '�ܽ��:<span class="new-txt-rd2">';
	span += zong;
	span += 'Ԫ</span><span class="new-fr">';
	span +=	zhushu;
	span += 'ע';
	span +=	qishu;
	span += '��';
	span +=	beishu;
	span +=	'��</span>';	
	return span;
}
	
function loadPayTotalInfo(){
	$("#payTotal").html(createPreTotalSpan());
}

function loadListInfo(){
	$("#numberInfo").html(creatPreDivList());	
}

function isEmpty(){
	var item = null;
	if(lotteryCategory == 1004){
		item = lotteryObj.infos;
	}else{
		item = lotteryObj.lottery;
	}
	if( item === null || item === undefined || item.length == 0){
		return true;
	}else{
		return false;
	}
}



/** ����ҳ�� */
function loadPageInfo(){
	loadBaseInfo();
	loadListInfo();	
	loadPayTotalInfo();
	if(isEmpty()){
		disableButton($("#clear-all"));
	}else{
		enableButton($("#clear-all"),alertTip2);
	}
}

/**
 * ɾ��1עѡ��
 * 
 * @param num
 *            ѡ�ŵ�
 */
function deleteRow(num){
	deleteLotteryItem1(num);
	//loadPageInfo();
    loadPayTotalInfo();
    if(isEmpty()){
        disableButton($("#clear-all"));
    }else{
        enableButton($("#clear-all"),alertTip2);
    }

    /*�h����ǰ��*/
    $("#numberrow" + num).remove();
    $("#numberInfo .new-tbl-type").each(function(index,item){
        /*�п���֮ǰ���ص�չʾ����*/
        if(index < 5){
            $(item).css("display","");
        }
    });

    /*ֻʣ����������ظ���*/
    if($("#numberInfo .new-tbl-type").size() < 6){
        $("#numberInfo .link-more").hide();
    }
}



/**
 * ���ע�����ܽ���Ƿ񳬹���׼
 */
function checkTotal(){
	var totalstake = caltotalstake();
	var multi = $("#multi").val();
	var issue = $("#issue").val();	
	
	if(isNaN(Number(multi)) || multi === null || multi === undefined || multi =="" ){		
		$("#multi").val("1");
		multi=1;
	}else{
		multi = Number(multi);
	}
	if(isNaN(Number(issue))|| issue === null || issue === undefined || issue ==""){
		$("#issue").val("1");
		issue=1;
	}else{
		issue = Number(issue);
	}
	//return false;
	var total = totalstake * multi * issue*2;
	
	if( total > maxAmount){		
		alertTip1('Ͷע����Ѿ��ﵽ'+maxAmount+'Ԫ,�޷�����ѡ��');
		return false;
	}
	
   if ( (lotteryCategory == 1002 || lotteryCategory == 1004 )&& totalstake > 500) {
	  	alertTip1('Ͷעע���Ѿ��ﵽ500ע,�޷�����ѡ��');
		return false;		   
   }	
   return true;
}

function get_one3D(){
	var onezhu = Math.floor(Math.random()*1000);
	if(onezhu < 10 ){
		onezhu = "00" + onezhu;
	}
	else if(onezhu< 100){
		onezhu = "0" + onezhu;
	}
	onezhu = new String(onezhu);
	var balls = onezhu.split("");
	var item = {
        "type":0,
        "bai":balls[0],
        "shi":balls[1],
        "ge":balls[2],
        "totalstake":1
	};
	addLotteryItem(item);	
}

// ����3��ѡ1ע���ŵ�sessionStorage
function get_onePL3(){
	var onezhu = Math.floor(Math.random()*1000);
	if(onezhu < 10 ){
		onezhu = "00" + onezhu;
	}
	else if(onezhu< 100){
		onezhu = "0" + onezhu;
	}
	onezhu = new String(onezhu);
	var balls = onezhu.split("");
	var item = {
        "type":0,
        "bai":balls[0],
        "shi":balls[1],
        "ge":balls[2],
        "totalstake":1
	};
	addLotteryItem(item);	
}

// ����5��ѡ1ע���ŵ�sessionStorage
function get_onePL5(){
	var onezhu = Math.floor(Math.random()*100000);
	if(onezhu < 10 ){
		onezhu = "0000" + onezhu;
	}
	else if(onezhu< 100){
		onezhu = "000" + onezhu;
	}
	else if(onezhu< 1000){
		onezhu = "00" + onezhu;
	}
	else if(onezhu< 10000){
		onezhu = "0" + onezhu;
	}
	onezhu = new String(onezhu);
	var balls = onezhu.split("");
	var item = {
        "type":0,
        "fifth":balls[0],
        "forth":balls[1],
        "third":balls[2],
        "second":balls[3],
        "first":balls[4],
        "totalstake":1
	};
	addLotteryItem(item);	
}

// ���ǲ��������һע
function get_oneQXC(){
var str="";
for ( var i = 0; i < 7; i++) {
		var randomNumber=parseInt(Math.random() * 10);
		str+=randomNumber;		
}
	var balls = str.split("");
	var item = {
        "first":balls[0],
		"second":balls[1],
		"third":balls[2],
		"forth":balls[3],
		"fifth":balls[4],
		"sixth":balls[5],
		"seventh":balls[6],
		"totalstake":1
	};
	addLotteryItem(item);	
}

function alertTip1(message){
	alertPopCenter();
	$("#alertPopHtml").html("<center>"+message+"</center>");
	$("#shade").toggle();
	$("#alertPop").toggle();
	
}

function closeAlertTip1(){	
	$("#shade").toggle();
	$("#alertPop").toggle();
}



function alertTip2(){		
	confirmPopCenter();	
	$("#confirmPopHtml").html("<center>�Ƿ����Ͷע�б�</center>");	
	$("#shade").toggle();
	$("#confirmPop").toggle();	
}
// ��ʱʱ���������һע
function get_oneXSSC(){
	if(lotteryObj.lottery.length > 0){
    	sessionStorage.setItem("xsscType", lotteryObj.lottery[lotteryObj.lottery.length-1].type);	
    }else{
    	sessionStorage.setItem("xsscType", 5);
    }
	// �½�ʱʱ��ѡ����Ϣ����,ȡ�����һ��ѡ�ŷ�ʽ
	var info = new Lottery1002.Xssc.info({
		type : sessionStorage.getItem("xsscType")
	});	
	info.generateAll();
	var xsscItem = {
			"type":info.type,
			"wan":info.balls5,
			"qian":info.balls4,
			"bai":info.balls3,
			"shi":info.balls2,
			"ge":info.balls1,
			"zu":info.balls0,
			"totalstake":info.count
		};
	addLotteryItem(xsscItem);
	
	
	
	
}

function getK3_subType(){
	var _subType = 0;
	if(lotteryObj.infos.length !== null && lotteryObj.infos.length !== undefined && lotteryObj.infos.length > 0){
		_subType = lotteryObj.infos[lotteryObj.infos.length-1].subType;
	}	
	return _subType;
}

function get_oneK3(){
	var type = 1;
	var subType = 3;
	if(lotteryObj.infos.length !== null && lotteryObj.infos.length !== undefined && lotteryObj.infos.length > 0){
		type = lotteryObj.infos[lotteryObj.infos.length-1].type;
		if(type != 1){
			subType = 0;
		}
	}	
		
		var info = new Lottery.K3.info({
			type : type,
			subType : subType
		});		
		info.generate();
		addLotteryItem(info);
}
/**
 * ���1ע�㷨
 */
function addRandom(){
	if(checkTotal()){
		switch(Number(lotteryCategory)){
		 	case 1:
		 		ball = new LotterySSQ();
		 		ball.get_oneFs1(1);
			break;
			case 2:
				get_one3D();
			break;
			case 4:
				ball = new LotteryDLT();
				ball.random_fs(1);
			break;
			case 5:
				get_onePL3();
			break;
			case 6:
				get_onePL5();
			break;
			case 7:
				get_oneQXC();
			break;
		    case 1002:
		    	get_oneXSSC();			
			break;
		    case 1004:
		    	get_oneK3();
		    break;
		}
	}
}

/**
 * �����ѡ
 */
function addByUser(){	
	if(checkTotal()){
		window.location.href = $("#addByUserHref").val();
	}
}

/**
 * ���������keyup�¼�
 */
function multiEvent(){
	var multi = $("#multi").val();
	multi = multi.replace(/\D/g, "");
	if(multi.length > 0){
		multi = parseInt((9+""+multi)-9*Math.pow(10,multi.length));  
	}	  
	if(multi == "0")
	{
		multi = "1";
	}else if(multi > 50)
	{
		multi = 50;
	}else if(multi < 0)
	{
		multi = 1;
	}
	$("#multi").val(multi);
	if(lotteryCategory == 1004){
		lotteryObj.muitl = multi;
	}else{
		lotteryObj.multiple = multi;				
	}
	refreshLottery();
}

/**
 * ���������keyup�¼�
 */
function issueEvent(){
	var issue = $("#issue").val();
	issue = issue.replace(/\D/g, "");
	if(issue.length > 0){
		issue = parseInt((9+""+issue)-9*Math.pow(10,issue.length));  
	}	  
	if(issue == "0")
	{
		issue = "1";
	}else if(issue > 30)
	{
		issue = 30;
	}else if(issue < 0)
	{
		issue = 1;
	}
	$("#issue").val(issue);
	if(lotteryCategory == 1004){
		lotteryObj.append = issue;
	}else{
		lotteryObj.appendissue.nums = issue;				
	}
	refreshLottery();
}

function clearAll(){
	if(lotteryCategory == 1004){
		lotteryObj.infos = [];
	}else{
		lotteryObj.lottery = [];
		lotteryObj.count = 0;		
	}
	refreshLottery();
}

function loadBaseInfo(){
	// ׷����ֹ���� ���ӿ��ֶΣ�stopflag�� 1-�н���ͣ׷ 3-��ͣ׷
	var appendType = 1;
	// ����
	var issue = 1;
	// ����
	var multi = 1;
	
	if(lotteryCategory == 1004){
		appendType = lotteryObj.appendType;
		issue = lotteryObj.append;
		multi = lotteryObj.muitl;
	}else{
		appendType = lotteryObj.appendissue.stopflag;
		issue = lotteryObj.appendissue.nums;
		multi = lotteryObj.multiple;
	}
	$("#issue").val(issue);
	$("#multi").val(multi);
	$("#appendType").val(appendType);
	if(appendType == 3){
		$("#issueType").removeClass("on");
	}else{
		$("#issueType").removeClass("on");
		$("#issueType").addClass("on");
	}
	
}

function changeIssueType(){
	if($("#appendType").val() == 3){
		$("#appendType").val("1"); 
		$("#issueType").removeClass("on");
		$("#issueType").addClass("on");
	}else{
		$("#appendType").val("3");
		$("#issueType").removeClass("on");
	}
	if(lotteryCategory == 1004){
		lotteryObj.appendType = $("#appendType").val();
	}else{
		lotteryObj.appendissue.stopflag = $("#appendType").val();
	}	
	refreshLottery();
}

function changeIAgreementType(){
	if($("#iAgreementFlag").val() == 0){
		$("#iAgreementFlag").val("1"); 
		$("#iAgreement").removeClass("on");
		$("#iAgreement").addClass("on");
	}else{
		$("#iAgreementFlag").val("0");
		$("#iAgreement").removeClass("on");
	}
}

function checkIAgreement(){
	if($("#iAgreementFlag").val() == 1){
		return true;
	}
	alertTip1("��Ǹ��δ��ѡ�ͻ��˹���Э��");	
	return false;	
} 


function disableButton(btn){
	removeButtonClass(btn);
	btn.addClass("btn-type5");  
	btn.unbind();
}

function enableButton(btn,clickFunction,btnClass){
	removeButtonClass(btn);
	if(btnClass !== null && btnClass !== undefined){
		btn.addClass(btnClass);
	}else{
		btn.addClass("btn-type1"); 
	}	
	btn.unbind();
	btn.bind("click",clickFunction);
}

function removeButtonClass(btn){
	btn.removeClass("btn-type1");
	btn.removeClass("btn-type2");
	btn.removeClass("btn-type5");
}

function clearAllEvent(){	
		disableButton($("#clear-all"));
		clearAll();
		loadPageInfo(); 
}

function submitEvent(){	
	if(!checkIAgreement()){		
		return false;
	}
	var flag = true;
	var jsonstr = sessionStorage.getItem("lottery_" + lotteryCategory);
	if (!!!jsonstr) {
		alertTip1("�ú�����Ͷע�ɹ�<br />������ѡ��");		
		flag =  false;
	}else if(isEmpty()){
		alertTip1("����Ϊ�գ�����ѡ��");
		flag =  false;
	}else if(!checkTotal()){
		flag =  false;
	}
 	if(flag){
 		multiEvent();
 	 	issueEvent();	 	 	
 		$("#baseForm").submit();
 	} 	
}

function returnIndexEvent(){
	if(alertTip12("������ҳ��")){
		return true;
	}else{
		return false;
	}
}
function alertMessage1(alertText){
	alertPopCenter();
	$("#alertPopHtml").html("<center>" + alertText +"</center>");
	$("#shade").toggle();
	$("#alertPop").toggle();
}
/** **************************** init method ********************************* */
   $(document).ready(function(){
	   
	   var alertMessage = $("#alertMessage").val();
		if(alertMessage!="" &&  alertMessage.length>0){
			alertMessage1(alertMessage);
		}
	   
	   	// ɾ���û���Ϣ
        sessionStorage.removeItem("lotteryUserInfo");
        // ��ȡ��������
        var type = $("#lotteryCategory").val();        
        // ���ݲ��ִ���LotteryObj����
        createLotteryObj(type);        
        // ����ҳ��
        loadPageInfo();
        
        
        // ��ӻ�ѡ��ť��onclick�¼�
        if(type == 1004 && getK3_subType() == 2) {
        	disableButton($("#btn-random1"));        	   
        }else{
        	$("#btn-random1").click(function(){
            	addRandom();
            	loadPageInfo();
            	enableButton($("#clear-all"),alertTip2);
            }); 
        }
        
	 
        // �����ѡ��ť��onclick�¼�
        $('#go-on-select').click(function(){
        	addByUser();
        });
		 
		// �л��н�ͣ׷���Ͱ�ť��onclick�¼�
		 $("#issueType,#issueType_span").click(function(){
			 changeIssueType();
		 });
		 
		// ��ѡͬ�⹺��Э�鰴ťonclick�¼�
		 $("#iAgreement").click(function(){
			 changeIAgreementType();
		 });
	 
		 // ����������keyup�¼�
		 $("#multi").keyup(function(){
			 multiEvent();			 
			 loadPayTotalInfo(); 
			 			 
		 });
		 
		 // ����������blur�¼�
		 $("#multi").blur(function(){
			 multiEvent();			 
			 loadPayTotalInfo(); 
		 });
		 
		 // ����������keyup�¼�
		 $("#issue").keyup(function(){
			 issueEvent();			 
			 loadPayTotalInfo(); 
		 });
		 
		 // ����������blur�¼�
		 $("#issue").blur(function(){
			 issueEvent();			 
			 loadPayTotalInfo(); 
		 });
		 
		 if($("#canSell").val() == 0  || (alertMessage!="" &&  alertMessage.length>0)){
			 disableButton($("#sub_btn"));
		 }else{
			// ������Ͷע��ť
			 $("#sub_btn").click(submitEvent);
		 }
		 
		// ȷ��
			$("#confirmPopTzButton").bind("click", function() {
				$("#shade").toggle();
				$("#confirmPop").toggle();
				clearAllEvent();		
			});
			
		//ȡ��
		$("#confirmPopBqButton").bind("click", function() {
					$("#shade").toggle();
					$("#confirmPop").toggle();
				});
		 
// $(".new-a-back").click(returnIndexEvent);
		 
	});

