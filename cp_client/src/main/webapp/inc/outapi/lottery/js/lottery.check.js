
function bindTesting(obj){
	for(var i=0; i<obj.length;i++){
		var v = new valid(obj[i]);
		$(obj[i].target).blur(v.myevent);
	}
};
function valid(ele){	
	this.myevent = function(){
	    for(var p=0; p < ele.arr.length; p++){	
	      var value = '"'+$(ele.target).val() + '"';
		  var t = eval(ele.arr[p][0].replace(/#/g, value));//��#��ת��ΪԪ�ز���֤
		  if(t){
       		   $(ele.error+"_1").hide();
			   $(ele.error+"_2").show();
       		   $(ele.error+"_2").html(ele.arr[p][1]);//ûͨ����֤
       		   return false;
			}
		}
 	    $(ele.error+"_2").hide();
	    $(ele.error+"_1").show();
	    $(ele.error+"_1").html("<font color='green'>��</font>");//ͨ����֤
        return true;
	}
}


function submitCheck(obj){
	for(var i=0; i<obj.length;i++){
		var v = new valid(obj[i]);
		if(!v.myevent()){
			return false;
		}
	}
	return true;
}

var checkRule={
	ChineseName:/^([\u4E00-\u9FA5]|[a-zA-Z]){2,10}$/,//��������
	Tel:/^\(?0?(10|2[0-57-9]|[3-9]\d{2}|1(3\d|59|58))\)?-?\d{8}(-\d{4})?$/,//�ֻ�$�̶��绰
	Mobile:/^(?:13|18|15)\d{9}$/,//�ֻ�
	BankCard : /^\d{16,19}$/, //�����ʺ�
    Number : /^\d+$/ //����
};


/*��ȷУ�����֤*/
function onCheckRegIDno(id_card) {
	var obj = $("#"+id_card).get(0);
    if (!isIDno(obj)) {
        return 1;
    }
    else {
        return 0;
    }
}

function isIDno(obj) {
 //aCity={11:"����",12:"���",13:"�ӱ�",14:"ɽ��",15:"���ɹ�",21:"����",22:"����",23:"������",31:"�Ϻ�",32:"����",33:"�㽭",34:"����",35:"����",36:"����",37:"ɽ��",41:"����",42:"����",43:"����",44:"�㶫",45:"����",46:"����",50:"����",51:"�Ĵ�",52:"����",53:"����",54:"����",61:"����",62:"����",63:"�ຣ",64:"����",65:"�½�",71:"̨��",81:"���",82:"����",91:"����"};
    var aCity = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91";
    var iSum = 0;
    var info = "";
    var idCardLength = obj.value.length;
    if(!/^\d{17}(\d|x)$/i.test(obj.value)&&!/^\d{15}$/i.test(obj.value)&&!/^\d{8}$/i.test(obj.value)) {
        return false;
    }

    //�ں����������x�൱������10,����ת����a
    var objvalue = obj.value.replace(/x$/i,"a");

    var curCity = objvalue.substr(0,2);

    if(!(aCity.indexOf(curCity) >= 0) ) {
        return false;
    }

    if (idCardLength==18) {
        sBirthday=objvalue.substr(6,4)+"-"+Number(objvalue.substr(10,2))+"-"+Number(objvalue.substr(12,2));
        var d = new Date(sBirthday.replace(/-/g,"/"));
        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) {
            return false;
        }
        for(var i = 17;i>=0;i --)
            iSum += (Math.pow(2,i) % 11) * parseInt(objvalue.charAt(17 - i),11);

        if(iSum%11!=1) {
            return false;
        }

    }
    else if (idCardLength==15) {
        sBirthday = "19" + objvalue.substr(6,2) + "-" + Number(objvalue.substr(8,2)) + "-" + Number(objvalue.substr(10,2));
        var d = new Date(sBirthday.replace(/-/g,"/"));
        var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        if(sBirthday != dd) {
            return false;
        }
    }
    else if (idCardLength==8) {
    }
    return true;
}

/*У��18��*/
function onCheckIDnoYoung(id_card) {
	var obj = $("#"+id_card).get(0);
    if (!isIDnoYoung(obj)) {
        return 1;
    }
    else {
        return 0;
    }
}

function isIDnoYoung(obj) {
    var idCardLength = obj.value.length;
    //�ں����������x�൱������10,����ת����a
    var objvalue = obj.value.replace(/x$/i,"a");
    if (idCardLength==18) {
        sBirthday=objvalue.substr(6,4)+"-"+Number(objvalue.substr(10,2))+"-"+Number(objvalue.substr(12,2));
        var d = new Date(sBirthday.replace(/-/g,"/"));
        var year = new Date().getFullYear();
        if (year - d.getFullYear() < 18) {
            return false;
        }
    }
    else if (idCardLength==15) {
        sBirthday = "19" + objvalue.substr(6,2) + "-" + Number(objvalue.substr(8,2)) + "-" + Number(objvalue.substr(10,2));
        var d = new Date(sBirthday.replace(/-/g,"/"));
        var year = new Date().getFullYear();
        if (year - d.getFullYear() < 18) {
            return false;
        }
    }
    else if (idCardLength==8) {
    }
    return true;
}
