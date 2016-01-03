
function get(id){return document.getElementById(id);}

function getElementsByClassName(parentElement, className) {
    var elements = (parentElement || document.body).getElementsByTagName("*");
    var result = [];
    className = new RegExp("(^|\\s)" + className + "(\\s|\x24)");
    var element;
    for (var i = 0; element = elements[i]; i++) {
        if (className.test(element.className)) {
            result.push(element);
        }
    }
    return result;
}

function randomSelect(arr, selectQuantity) {
    var result = [];
    for (var i = 0; i < selectQuantity; i++) {
        var idx = Math.floor(Math.random() * arr.length);
        result[result.length] = arr[idx];
        arr.splice(idx, 1);
    }
    return result;
}

//���㵹��ʱ
function LotteryTimer(canSell, time, id,callback,awardPool) {
    this.canSell = canSell;
    this.time = time;
    this.id = id;
    this.callback = callback;
    if(awardPool===undefined){
    	this.awardPool = 0;
    }else{
    	this.awardPool =awardPool;
    }
    this.timer = null;
}

LotteryTimer.prototype.start = function(o) {
    if (o.time > 0) {
        if (o.canSell){
            o.setRemainTime(o.time, o.id,o.awardPool);
        }
        o.time -= 1000;
        o.timer = setTimeout(function() {
            o.start(o);
        }, 1000);
    }else{
        o.callback();
    }
};

LotteryTimer.prototype.clear = function() {
    clearTimeout(this.timer);
};

LotteryTimer.prototype.setRemainTime = function(time, id, awardPool) {
	//��������
	var _id = id.substring(5);
	
    var tt = time / 1000;
    var seconds = parseInt(tt % 60);
    var minutes = parseInt((tt / 60) % 60);
    var hours = parseInt((tt / 60 / 60) % 24);
    var days = parseInt(tt / 60 / 60 / 24);

    seconds < 10 ? seconds = "0" + seconds : seconds = seconds;
    minutes < 10 ? minutes = "0" + minutes : minutes = minutes;
    
    var timeHtml = "";
    if(days>0){
    	timeHtml += "<b>" + days + "</b><em>��</em>";
    }
    if(hours>0 || days>0){
    	timeHtml += "<b>" + hours + "</b><em>Сʱ</em>";
    }   
    if(minutes>0 || days>0 ||  hours>0){
    	timeHtml += "<b>" + minutes + "</b><em>��</em>";
    }    
    timeHtml += "<b>" + seconds + "</b><em>��</em>";
    
    
    $("#" + id).html(timeHtml);
    
     
    //��ʱʱ�ʺͿ����������� "�����¿���"����ʱ��ȥ�����  ���򵹼�ʱС��3���ӱ�� 
    if (_id == "1002" || _id == "1004"){
    	//ȥ���
    	if(("�����¿��ڣ�" == $("#issueNameId_"+_id).text())) {
    		var bb = $("#"+id+" b");
    		var ss = $("#"+id+" em");
    		$.each(bb, function(i,n) {
    			$(n).removeClass("red");
    		});  
    		$.each(ss, function(i,n) {
    			$(n).removeClass("red");
    		});     		
    	}else if (hours==0&&minutes < 3) {    		
    		var bb = $("#"+id+" b");
    		var ss = $("#"+id+" em");
    		$.each(bb, function(i,n) {
    			$(n).addClass("red");
    		});
    		$.each(ss, function(i,n) {
    			$(n).addClass("red");
    		});    		
        }    	
    }else if (_id =="1" || _id=="4" || _id=="7"){
    	//˫ɫ��  ÿ�ܶ����ġ���  19:40 
    	//����͸  ÿ��һ�������� 19:40   	
    	//���ǲ�  ÿ�ܶ����塢�� 19:40    	
    	if(days == 0  && ( hours<19 || ( hours == 19 && minutes <=40 )) ){
    		$("#watermark_"+_id).html('<span class="tip"><span class="bg-arr"></span><span>���տ���</span></span>');
    	}else if (!(awardPool===undefined) && awardPool >= 100000000){
    		$("#watermark_"+_id).html('<span class="tip"><span class="bg-arr"></span><span>���ع���</span></span>');    		
    	}else{
    		$("#watermark_"+_id).html('');
    	}    	
    }
};

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}
function trim(str) {
    //ɾ���������˵Ŀո�
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function htmltagfilter(value) {
   value = value.replace(/<\/?[^>]*>/g,''); //ȥ��HTML tag
   value = value.replace(/[ | ]*\n/g,'\n'); //ȥ����β�հ�
   value = value.replace(/\n[\s| | ]*\r/g,'\n'); //ȥ���������
   return value;
}

function canSellCheck(canSell, statusDesc) {
	if (statusDesc == '') {
		statusDesc = "<br /><div>�ܱ�Ǹ���ò�����ͣ���ۣ�����ʱ������֪ͨ��ף�����ˣ�</div><br/>��� <a href=\"http://caipiao.jd.com\"><span style=\"font-size:16pt\">����</span></a> ���ز�Ʊ��ҳ";
	}
	if(!canSell){
		jQuery.jdThickBox({
			width:500,
			height:200,
			type:"text",
			source:statusDesc,
			title:"ֹͣ����"
		});
	}
}

function endIssueMessage(issueName) {
    statusDesc = "<div><s></s><ul><li><span>"+issueName+"</span>���ѽ�ֹͶע��</li><li>�����Ⱥ������ٽ���Ͷע��</li></ul></div> <div class='btn'><a href=\"#\" onclick='jdThickBoxclose()'>ȷ��</a></div>";
    jQuery.jdThickBox({
        width:300,
        height:100,
        type:"text",
        source:statusDesc,
        title:"��ܰ��ʾ"
    });
}
