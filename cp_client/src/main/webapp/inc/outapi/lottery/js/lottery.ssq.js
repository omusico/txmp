
function LotterySSQ(){
    this.maxMulti = 50;
    this.row = 0; //�м�¼��
    this.separator = "|";
    this.tuomaType = true;  //�жϺ�ɫ�����롢���룩
    this.reds1_dt = []; // ѡ�еĺ�����
    this.reds2_dt = []; // ѡ�еĺ�������
    this.blues_dt = []; // ѡ�е�����
    this.total_dt = 1;
}

LotterySSQ.prototype.getAllRedBall = function(){
	return ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33"];
};

LotterySSQ.prototype.getAllBlueBall = function(){
	return ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
};

//�����淨
LotterySSQ.prototype.dantuo = function(){
	var __Ball = this;
    this.dt_type();
	//������
	for(var i = 0; i < __Ball.red_balls1_dt.length; i ++ ){
		__Ball.red_balls1_dt[i].index = i;
		__Ball.red_balls1_dt[i].onclick = function(){
            __Ball.select_ball_dt(this, "dt_red1");
			__Ball.display_info();
		}
	}

	//��������
	/*for(var i = 0; i < __Ball.red_balls2_dt.length; i ++ ){
		__Ball.red_balls2_dt[i].index = i;
		__Ball.red_balls2_dt[i].onclick = function(){
			__Ball.select_ball_dt(this, "dt_red2");
			__Ball.display_info();
		}
	}*/

	//����
	for(var i = 0; i < __Ball.blue_balls_dt.length; i ++ ){
		__Ball.blue_balls_dt[i].index = i;
		__Ball.blue_balls_dt[i].onclick = function(){
			__Ball.select_ball_dt(this, "dt_blue");
			__Ball.display_info();
		}
	}

	//����Ϸ�ѡ��
	get("btn-clear-dt").onclick = function(){
		$('#dantuo_msg').css('display','none');
        $('#jd_title').hide();
        __Ball.clear_all();
		__Ball.display_info();
	};

	//ȷ��ѡ��
	get("btn-append-dt").onclick = function(){
		__Ball.confirm_select_dt();		
	};

    /*get("btn-reselect-dt").onclick = function() {
        __Ball.clear_all();
        __Ball.display_info();
        __Ball.after_edit_dt();
    };*/

    get("danma").onclick = function(){
        get(this.id).className = 'curr curr-f';
        get('tuoma').className = '';
        get('red_ga').innerHTML = '����';
        get('gray').innerHTML = '����ѡ��1�����룬���ѡ��5������';
        $('#jd_title').hide();
        __Ball.danma();
    }

    get("tuoma").onclick = function(){
        get(this.id).className = 'curr curr-r';
        get('danma').className = '';
        get('red_ga').innerHTML = '����';
        get('gray').innerHTML = '����ѡ��2������';
        $('#jd_title').hide();
        __Ball.tuoma();
    }
};

LotterySSQ.prototype.danma = function(){
//    alert('����='+this.reds2_dt.length+'     ����='+this.reds1_dt.length);
    if(this.tuomaType==false){
        for(var i = 0; i < this.reds2_dt.length; i ++ ){
            this.reds2_dt[i].className == "ball selected" ? this.reds2_dt[i].className = "ball dantuo" :this.reds2_dt[i].className = "ball selected" ;
        }
        for(var i = 0; i < this.reds1_dt.length; i ++ ){
            this.reds1_dt[i].className == "ball dantuo" ? this.reds1_dt[i].className = "ball selected" :this.reds1_dt[i].className = "ball dantuo" ;
        }
    }
    this.tuomaType = true;
}

LotterySSQ.prototype.tuoma = function(){
//    alert('����='+this.reds1_dt.length+'     ����='+this.reds2_dt.length);
    if(this.tuomaType==true){
        for(var i = 0; i < this.reds1_dt.length; i ++ ){
            this.reds1_dt[i].className == "ball selected" ? this.reds1_dt[i].className = "ball dantuo" :this.reds1_dt[i].className = "ball selected" ;
        }
        for(var i = 0; i < this.reds2_dt.length; i ++ ){
            this.reds2_dt[i].className == "ball dantuo" ? this.reds2_dt[i].className = "ball selected" :this.reds2_dt[i].className = "ball dantuo" ;
        }
    }
    this.tuomaType = false;
}
//���������
LotterySSQ.prototype.clear_all = function(){
	for(var i = 0; i < 33; i ++ ){
		this.red_balls1_dt[i].className = "ball";
		if(i < 16){
			this.blue_balls_dt[i].className = "ball";
		}
	}
};

//ȥ�������ظ�
LotterySSQ.prototype.trim_repeat = function(obj,index){
	
	
    if(obj[index].className == "ball dantuo"){
        var str = '';
        if ($('#red_ga').html()=='����'){
            str = '����';
        }else{
            str = '����';
        }
        alertTip('�˺����ѱ�'+str+'ѡ��!');
    }
};

//ѡ��˫ɫ��
LotterySSQ.prototype.select_ball_dt = function(ball,type){
//    ball.className == "ball selected" ? ball.className = "ball" :ball.className = "ball selected" ;
	
	
	if(get('danma').className != '' && this.red_balls1_dt[ball.index].className == "ball" && this.reds1_dt.length >= 5 && ball.parentNode.parentNode.id == "dt-redball-list1"){
    	alertTip("���ѡ��5��������!");
    }
	//ѡ�е���
	else if(ball.parentNode.parentNode.id == "dt-redball-list1" && ball.className == "ball" && get('danma').className != '' && caltotalstake()*2+currentMoney_dt(this.reds1_dt.length+1,this.reds2_dt.length,this.blues_dt.length)>maxAmount ){
		alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
	}
	//��������
	else if(ball.parentNode.parentNode.id == "dt-redball-list1" && ball.className == "ball selected" && get('danma').className != '' && caltotalstake()*2+currentMoney_dt(this.reds1_dt.length-1,this.reds2_dt.length,this.blues_dt.length)>maxAmount ){
		alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
	}
	//ѡ������
	else if(ball.parentNode.parentNode.id == "dt-redball-list1" && ball.className == "ball" && get('tuoma').className != '' && caltotalstake()*2+currentMoney_dt(this.reds1_dt.length,this.reds2_dt.length+1,this.blues_dt.length)>maxAmount ){
		alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
	}
	//ѡ������
	else if(ball.parentNode.parentNode.id == "dt-blueball-list" && ball.className == "ball" && caltotalstake()*2+currentMoney_dt(this.reds1_dt.length,this.reds2_dt.length,this.blues_dt.length+1)>maxAmount ){
		alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
	}
	else{
	if(ball.className == "ball selected"){
        ball.className = "ball";
    }else if(ball.className == "ball"){
        ball.className = "ball selected";
    }
    switch(type){
		case "dt_red1" :
		this.trim_repeat(this.red_balls2_dt,ball.index);
		break;
		
		case "dt_blue" :
            $('#jd_title').hide();
		break;
	}
	}
};


//��ǰͶע�������淨��
function currentMoney_dt(danma_ball,tuoma_ball,blue_ball){
	var total = 0;
	var x = 1;
	var c = 6 - danma_ball;
	total = n = tuoma_ball;
	for(var i = 1; i < c; i ++ ){
		total *= ( -- n );
	}

	for(var i = c; i > 1; i -- ){
		x = x * i;
	}
	total = Math.ceil(total / x * blue_ball) * 2;
	return total;
}


//��ʾѡ����Ϣ
LotterySSQ.prototype.display_info = function(){
	this.num_balls();
	this.get_zhu();

	get("dantuo_text").innerHTML = (this.reds1_dt.length + this.reds2_dt.length) + "������(" + this.reds1_dt.length + "������," + this.reds2_dt.length + "������)��" + this.blues_dt.length + "�����򣬹�<span id='total-zhu-dt'>" + this.total_dt + "</span>ע����<span class='red' id='total-money-dt'>��" + (this.total_dt * 2) + ".00</span>Ԫ";
};

LotterySSQ.prototype.get_zhu = function(){
    var total = 0;
	var n1 = this.reds1_dt.length;
	var n2 = this.reds2_dt.length;
	var n3 = this.blues_dt.length;
	if(n1 > 0 && n1 < 6 && n2 > 1 && (n1 + n2) > 6 && (n1 + n2) < 34 && n3 >0){

		var x = 1;
		var c = 6 - n1;
		total = n = n2;
		for(var i = 1; i < c; i ++ ){
			total *= ( -- n );
		}

		for(var i = c; i > 1; i -- ){
			x = x * i;
		}
		this.total_dt = Math.ceil(total / x * n3);
	}else{
        this.total_dt = 0;
    }
};

//���Ͻӿ�
LotterySSQ.prototype.dt_type = function(){
    /*this.reds1_dt = []; // ѡ�еĺ�����
    this.reds2_dt = []; // ѡ�еĺ�������
    this.blues_dt = []; // ѡ�е�����
    this.total_dt = 1;*/
    this.red_balls1_dt = $("#dt-redball-list1 li div.ball");
    this.red_balls2_dt = $("#dt-redball-list1 li div.ball");
//    this.red_balls2_dt = $("#dt-redball-list2 li div.ball");
    this.blue_balls_dt = $("#dt-blueball-list li div.ball");

};

//��ʽѡ��
LotterySSQ.prototype.fs = function(){

	var __Ball = this;

	//�󶨸��ְ����¼�
	this.fs_type();
//	get("random_red").onclick = function(){__Ball.random_select(get('randomnum-red').value,0);};
	get("randomnum-red").onchange = function(){__Ball.random_select(get('randomnum-red').value,0);};
//	get("random_blue").onclick = function(){__Ball.random_select(get('randomnum-blue').value,1);};
	get("randomnum-blue").onchange = function(){__Ball.random_select(get('randomnum-blue').value,1);};

//	get("btn-clear-red").onclick = function(){__Ball.clear_ball($("#redball-list"));__Ball.display();}; //���
//	get("btn-clear-blue").onclick = function(){__Ball.clear_ball($("#blueball-list"));__Ball.display();};   //���
	get("btn-clear").onclick = function(){
		$('#fs_msg').css('display','none');
        $("#randomnum-red").val(0);
        $("#randomnum-blue").val(0);
        __Ball.clear_ball($("#redball-list"));
        __Ball.clear_ball($("#blueball-list"));
        __Ball.display();
    };

    /*get("btn-reselect").onclick = function() {    //����ѡ��
        __Ball.clear_ball($("#redball-list"));
        __Ball.clear_ball($("#blueball-list"));
        __Ball.display();
        __Ball.after_edit();
    };*/

    //����б��
    get("btn-append").onclick = function(){
        __Ball.confirm_select();
        __Ball.total_num();
    };

    //��ѡ
    get("btn-random1").onclick = function(){
    	$('#fs_msg').css('display','none');
    	$("#randomnum-red").val(6);
    	$("#randomnum-blue").val(1);
        __Ball.random_fs(1);
        __Ball.random_select(6,0);
        __Ball.random_select(1,1);
//        __Ball.total_num();
    };
	/*get("btn-random5").onclick = function(){__Ball.random_fs(5);__Ball.total_num();};
    get("btn-random10").onclick = function(){__Ball.random_fs(10);__Ball.total_num();};*/
//	get("btn-allclear").onclick = function(){if($("#num tbody tr").length > 0 && confirm("ȷ��ɾ��ȫ����")){__Ball.del_all();__Ball.total_num();}};
    
//	get("btn-getdata").onclick = function(){__Ball.get_data();};

	this.beitou();  //����
//    this.beitou_calc();

};

//ת��Ϊҳ���ϵ�Ͷע������ʾ
LotterySSQ.prototype.set_data=function(){
	/*var datas=get("lotteryNumber").value;
	if(datas!=""){
	var arr=datas.split(";");
	for(var i=0;i<arr.length;i++){
        var num = arr[i].split(":");
		this.row++;
        if (num[0] == "2") {
            var dt_num = num[1];
            if(num[1].indexOf("$") != -1) {
                dt_num = "(" + num[1].replace("$", ")");
            }
            $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>" + switch_id(num[0]) + "</td><td width='250' class='al'><div title=\"" + dt_num + "\">" + dt_num + "</div></td><td width='110'>[" + num[2] +"ע " + num[2]*2 + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select_dt("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select_dt("+ this.row + ")'>ɾ��</a></td></tr>");
        } else {
            $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>" + switch_id(num[0]) + "</td><td width='250' class='al'><div title=\"" + num[1] + "\">" + num[1] + "</div></td><td width='110'>[" + num[2] +"ע " + num[2]*2 + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select("+ this.row + ")'>ɾ��</a></td></tr>");
        }
	}
	this.total_num();
	}

    function switch_id(obj){
		switch(obj) {
            case "0":
                return "��ʽͶע";
            case "1":
                return "��ʽͶע";
            case "2":
                return "����Ͷע";
            default:
                return "����";
        }
	}*/
};


//��ȡһע���ŵ�session
LotterySSQ.prototype.get_oneFs = function(lotteryCategory){
	this.get_oneFs1(lotteryCategory);
	precardHtml();
	pretotalHtml();
};

LotterySSQ.prototype.get_oneFs1 = function(lotteryCategory){
	var allRedBall = this.getAllRedBall();
    var allBlueBall = this.getAllBlueBall();
    var randomRed = randomSelect(allRedBall, 6).sort();
    var randomBlue = randomSelect(allBlueBall, 1)[0];
    var item = {
        "type":0,
        "red":randomRed.join(),
        "blue":randomBlue,
        "totalstake":1
    };
    addLotteryItem(item);
};

//ת����ѡ���벢���������������ύ
LotterySSQ.prototype.get_data = function(){
	/*var datas = [];
    var num = 0;
	$("#num tbody tr").each(function(){
        var tds = $(this).children("td");
        var zhuNum = parseInt(tds.eq(2).text().split("ע")[0].split("[")[1]);
		datas.push(switch_type(tds.eq(0).text()) + ":" + tds.eq(1).text().split("[")[0] + ":" + zhuNum);
        num += zhuNum;
    });

	get("lotteryNumber").value = datas.join(";");
    get("totalStake").value = num;
    get("totalFee").value = num * 2 * get("multi").value;

    function switch_type(obj){
		switch(obj) {
            case "��ʽͶע":
                return 0;
            case "��ʽͶע":
                return 1;
            case "����Ͷע":
                return 2;
            default:
                return -1;
        }
	}*/
};

//��ʽͶע��ѯ
LotterySSQ.prototype.fs_search = function(){
	var __Ball = this;
	//�󶨸��ְ����¼�
	this.type = "fs_search";
	this.fs_type();
	get("confirm_select").onclick = function(){__Ball.confirm_select();};
	get("clear_all").onclick = function(){__Ball.clear_ball(get("red_balls"));__Ball.clear_ball(get("blue_balls"));__Ball.display();};

};


//��ʽͶע�ӿ�
LotterySSQ.prototype.fs_type = function(){
	this.red_num = 0;//��ʽͶע��ʽ�ĺ������
	this.blue_num = 0;//��ʽͶע��ʽ���������
	this.red_balls = $("#redball-list li div.ball");
	this.blue_balls = $("#blueball-list li div.ball");
	this.fs_bind();

};

LotterySSQ.prototype.fs_bind = function(){

	var __Ball = this;
	for(var i = 0; i < 33; i ++ ){
		__Ball.red_balls[i].onclick = function(){__Ball.select_ball(this, "fs_red");__Ball.display();};//��ʽͶע����
		if(i < 16){
			__Ball.blue_balls[i].onclick = function(){__Ball.select_ball(this, "fs_blue");__Ball.display();};//��ʽͶע����
		}
	}
};

//ѡ��˫ɫ��
LotterySSQ.prototype.select_ball = function(ball,type){
	
	var __Ball = this;
	
	switch(type){

		//��ʽͶע����
		case "fs_red" :
		if(ball.className == "ball selected"){ball.className = "ball";__Ball.red_num --; } 
		else if(caltotalstake()*2+currentMoney(parseInt(this.red_num)+1,this.blue_num)>maxAmount){
			alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
		}
		else if(this.red_num >= 16) {
			alertTip("���ѡ��16������!");
		}
		else{ball.className = "ball selected";__Ball.red_num ++;}
		break;

		//��ʽͶע����
		case "fs_blue" :
		if(ball.className == "ball selected"){ball.className = "ball";__Ball.blue_num --; }
		else if(caltotalstake()*2+currentMoney(this.red_num,parseInt(this.blue_num)+1)>maxAmount){
			alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
		}
		else{ball.className = "ball selected";__Ball.blue_num ++;}
		break;
	}
};


//��ǰͶע����׼�淨��
function currentMoney(redball,blueball){
	var total = n = redball;
	for(var i = 1; i < 6; i ++ ){
		total *= ( -- n );
	}
	var totalmoney = Math.ceil(total / 720 * blueball) *2;
	return totalmoney;
}


//��ʾ��ѡ��˫ɫ����Ϣ
LotterySSQ.prototype.display = function(){

		if(this.red_num > 5 && this.red_num < 17 && this.blue_num > 0){//ͨ������Ž���ע������

			var total = n = this.red_num;
			for(var i = 1; i < 6; i ++ ){
				total *= ( -- n );
			}
			this.total = Math.ceil(total / 720 * this.blue_num);

		}
		else{ this.total = 0 ;}

		get("fs_text").innerHTML = this.red_num + "������" + this.blue_num + "�����򣬹�<span id='total-zhu'>" + this.total + "</span>ע����<span class='red' id='total-money'>��" + this.total*2 + ".00</span>Ԫ";

};

//��ʽͶע���ѡ��
LotterySSQ.prototype.random_select = function(s,color){

    var result;
	if(color == 0){
		if(currentMoney(s,this.blue_num)+caltotalstake()*2>maxAmount){
			alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
			$("#randomnum-red").val(0);			
		}
		else{
			result = randomSelect(this.getAllRedBall(), s);
			this.clear_ball($("#redball-list"));
			for(var i =0; i < s; i ++ ){
				this.red_balls[parseInt(result[i],10)-1].className = "ball selected";
			}
			this.red_num = s;
			this.display();
		}
	}else{
		
		if(currentMoney(this.red_num,s)+caltotalstake()*2>maxAmount){
			alertTip("��Ͷע���ܳ���"+maxAmount+"Ԫ!");
			$("#randomnum-blue").val(0);
		}
		else{
			result = randomSelect(this.getAllBlueBall(), s);
			this.clear_ball($("#blueball-list"));
			for(var i =0; i < s; i ++ ){
				this.blue_balls[parseInt(result[i],10)-1].className = "ball selected";
			}
			this.blue_num = s;
			this.display();
		}
	}

};


LotterySSQ.prototype.random_fs = function(n){

	for(var k = 0; k < n; k++){
        var allRedBall = this.getAllRedBall();
        var allBlueBall = this.getAllBlueBall();
        var randomRed = randomSelect(allRedBall, 6).sort();
        var randomBlue = randomSelect(allBlueBall, 1)[0];

        this.row++;
        var num = randomRed.join(" ") + this.separator + randomBlue;
//        $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>��ʽͶע</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>[1ע 2Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select("+ this.row + ")'>ɾ��</a></td></tr>");
	}
};

/*
��ʽͶע����

����:����ѡ��6�������20��
����:����ѡ��1��
*/
LotterySSQ.prototype.check_rule_fs = function(){
		this.fs_alert_text = "";
		if(this.red_num < 6){this.fs_alert_text += "����������ѡ��6������<br />";}
		if(this.red_num > 16){this.fs_alert_text += "���������ѡ��16������<br />";}
		if(this.blue_num < 1 ){this.fs_alert_text += "����������ѡ��1������<br />"}
        if(this.total*2 > maxAmount){this.fs_alert_text += "��ע���ܳ���" + maxAmount + "Ԫ<br />"}
		if(this.fs_alert_text != "" ){return false;}
		else{return true;}
};

/*
����Ͷע����
*/
LotterySSQ.prototype.check_rule_dt = function(){
    this.dt_alert_text = "";
	if(this.reds1_dt.length < 1){this.dt_alert_text += "����ѡ��1��������<br />";}
	if(this.reds1_dt.length > 5){this.dt_alert_text += "���ѡ��5��������<br />";}
	if(this.reds2_dt.length < 2){this.dt_alert_text += "����ѡ��2����������<br />";}
	if((this.reds1_dt.length + this.reds2_dt.length) < 7 ){this.dt_alert_text += "����������벻������7��<br />";}
	if((this.reds1_dt.length + this.reds2_dt.length) > 20 ){this.dt_alert_text += "����������벻�ܴ���20��<br />";}
	if(this.blues_dt.length < 1){this.dt_alert_text += "����ѡ��1������<br />";}
    if(this.total_dt*2 > maxAmount){this.dt_alert_text += "��ע���ܳ���" + maxAmount + "Ԫ<br />"}
	if(this.dt_alert_text != ""){return false;}
    else{return true;}
};




//ȷ��ѡ��
LotterySSQ.prototype.confirm_select = function(){

		if(this.check_rule_fs()){
			$('#fs_msg').css('display','none');
				var reds = [];
				var blues = [];
				for(var i =0; i < 33; i ++ ){
					if(this.red_balls[i].className == "ball selected"){reds.push(this.red_balls[i].innerHTML)};
					if(i < 16){
						if(this.blue_balls[i].className == "ball selected"){blues.push(this.blue_balls[i].innerHTML)};
					}
				}
			if(!this.type){

                var type = (reds.length > 6 || blues.length > 1) ? 1:0;
                var item = {
                    "type":type,
                    "red":reds.join(),
                    "blue":blues.join(),
                    "totalstake":this.total
                };
                addLotteryItem(item);
                btu();
                /*alert(sessionStorage.getItem('lottery_1'));*/

                /*this.row++;
                var type = (reds.length > 6 || blues.length > 1) ? "��ʽͶע" : "��ʽͶע";
                var num = reds.join(" ") + this.separator + blues.join(" ");
                $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>" + type + "</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>["+ this.total +"ע " + this.total*2 + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select("+ this.row + ")'>ɾ��</a></td></tr>");*/
			}

            this.clear_ball($("#redball-list"));
            this.clear_ball($("#blueball-list"));
            this.display();
		}else{
            alertTip(this.fs_alert_text);
            //$('#fs_msg').css('display','block');
            //$('#fs_msg').html(this.fs_alert_text);
        }

};

LotterySSQ.prototype.confirm_select_dt = function(){
    this.num_balls();

	if(this.check_rule_dt()){
		$('#dantuo_msg').css('display','none');
        this.row++;

        var bt1 = [];
		var bt2 = [];
		var bt3 = [];
		for(var i = 0; i < this.reds1_dt.length; i ++ ){
			bt1.push(this.reds1_dt[i].innerHTML);
		}
		for(var i = 0; i < this.reds2_dt.length; i ++ ){
			bt2.push(this.reds2_dt[i].innerHTML);
		}
		for(var i = 0; i < this.blues_dt.length; i ++ ){
			bt3.push(this.blues_dt[i].innerHTML);
		}

        var item = {
            "type":2,
            "dan":bt1.join(),
            "tuo":bt2.join(),
            "blue":bt3.join(),
            "totalstake": this.total_dt
        };
        
        addLotteryItem(item);
        btu();
        
        /*var num = "(" + bt1.join(" ") +  ")" + bt2.join(" ") + this.separator + bt3.join(" ");
        $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>����Ͷע</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>[" + this.total_dt + "ע " + (this.total_dt * 2) + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select_dt("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select_dt("+ this.row + ")'>ɾ��</a></td></tr>");*/
    	this.total_num();
		this.clear_all();
		this.display_info();

	}else{
		alertTip(this.dt_alert_text);
		//$('#dantuo_msg').css('display','block');
		//$('#dantuo_msg').html(this.dt_alert_text);
	}
};

LotterySSQ.prototype.num_balls = function(){
    var __Ball = this;
	this.reds1_dt = [];
	this.reds2_dt = [];
	this.blues_dt = [];

    if (__Ball.tuomaType){
        for(var i = 0; i < 33; i ++ ){
            if(__Ball.red_balls1_dt[i].className == "ball selected"){
                this.reds1_dt.push(__Ball.red_balls1_dt[i]);
            }else if(__Ball.red_balls1_dt[i].className == "ball dantuo"){
                this.reds2_dt.push(__Ball.red_balls1_dt[i]);
            }
        }
    }
    
    if (__Ball.tuomaType==false){
        for(var i = 0; i < 33; i ++ ){
            if(__Ball.red_balls1_dt[i].className == "ball selected"){
                this.reds2_dt.push(__Ball.red_balls1_dt[i]);
            }else if(__Ball.red_balls1_dt[i].className == "ball dantuo"){
                this.reds1_dt.push(__Ball.red_balls1_dt[i]);
            }
        }
    }

    /*for(var i = 0; i < 33; i ++ ){
        if(__Ball.red_balls1_dt[i].className == "ball selected"){
            if (__Ball.tuomaType){
                this.reds1_dt.push(__Ball.red_balls1_dt[i]);
            }else{
                this.reds2_dt.push(__Ball.red_balls1_dt[i]);
            }
        }
	}*/

	/*for(var i = 0; i < 33; i ++ ){
		if(__Ball.red_balls2_dt[i].className == "ball selected"){this.reds2_dt.push(__Ball.red_balls2_dt[i])}
	}*/

	for(var i = 0; i < 16; i ++ ){
		if(__Ball.blue_balls_dt[i].className == "ball selected"){this.blues_dt.push(__Ball.blue_balls_dt[i])}
	}

};

//��Ͷ��ʾ
LotterySSQ.prototype.total_num = function(){
    /*return;*/
	/*var num = 0;
    var multi = get("multi").value;
	var n = $("#num tbody tr").length;
	if(!isNaN(multi) && multi > 0 && n > 0){
        $("#num tbody tr").each(function(){
            num += parseInt($(this).children("td").eq(2).text().split("ע")[0].split("[")[1]);
        });
		get("total_zhushu").innerHTML = "ע����" + num + "ע";
		get("total_money").innerHTML = "��" + num * 2 * multi + ".00";
        get("base_total").innerHTML = "����Ͷע�ܽ�<span class='red'>��" + num * 2 * multi + ".00</span>Ԫ [" + num + "ע "+ multi +"��]";
	}else{
		get("total_zhushu").innerHTML = "ע����0ע";
		get("total_money").innerHTML = "��0.00";
        get("base_total").innerHTML = "����Ͷע�ܽ�<span class='red'>��0.00</span>Ԫ [0ע 0��]";
	}

    LotteryPlay.otherTotal(num);*/
};

//��Ͷ
LotterySSQ.prototype.beitou = function(){
	var __Ball = this;
	get("multi").onkeyup = function(){
        this.value = this.value.replace(/\D/, "");
        if (isNaN(this.value) || this.value < 1) {
            this.value = "1";
        }
        if (this.value > __Ball.maxMulti) {
            this.value = __Ball.maxMulti;
        }
        __Ball.total_num(this.value);
	};
    get("multi").onkeydown = function(){
        if (this.value < 1) {
            this.value = "1";
        }
	};
};

//��Ͷ�Ӽ�
LotterySSQ.prototype.beitou_calc = function(){
	var __Ball = this;
    var reg = /^\d{1,2}$/;
	get("btn-multi-add").onclick = function(){

				if(reg.test(get("multi").value) && get("multi").value < __Ball.maxMulti){
                    get("multi").value++;
					__Ball.total_num(get("multi").value);
				}
	};
    get("btn-multi-sub").onclick = function(){

				if(reg.test(get("multi").value) && get("multi").value > 1){
                    get("multi").value--;
					__Ball.total_num(get("multi").value);
				}
	};
};


//�����ѡ����
LotterySSQ.prototype.clear_ball = function(obj){

	var ball = obj.find("li div.ball");
	for(var i =0; i < ball.length; i ++ ){
		ball[i].className = "ball";
	}

	switch(obj[0].id){

		case "redball-list" : this.red_num = 0; break;
		case "blueball-list" : this.blue_num = 0; break;

	}
};



LotterySSQ.prototype.del_all = function(){
	$("#num tbody").empty();
    this.row = 0;
};

LotterySSQ.prototype.del_select = function(id){
    if ($("#num tbody tr#" + id).hasClass("sonor")) {
        this.after_edit();
    }
    $("#num tbody tr#" + id).remove();
    this.total_num();
};

LotterySSQ.prototype.del_select_dt = function(id){
    if ($("#num tbody tr#" + id).hasClass("sonor")) {
        this.after_edit_dt();
    }
    $("#num tbody tr#" + id).remove();
    this.total_num();
};

LotterySSQ.prototype.edit_select = function(id){
    this.clear_ball($("#redball-list"));
    this.clear_ball($("#blueball-list"));
    // �����׼ҳǩ
    $("#fs_select").click();
    var pos = $("#select").offset().top;
    $("html,body").animate({scrollTop:pos}, 500);

    var datas = $("#num tbody tr#" + id).children("td").eq(1).text().split("[")[0].split(this.separator);
    var reds = datas[0].split(" ");
    var blues = datas[1].split(" ");

    for (var i = 0; i < reds.length; i++) {
        // ʮ����
        var index = parseInt(reds[i], 10);
        if (index > 0)
            this.select_ball(this.red_balls[index - 1], "fs_red");
    }
    for (var j = 0; j < blues.length; j++) {
        var index = parseInt(blues[j], 10);
        if (index > 0)
            this.select_ball(this.blue_balls[index - 1], "fs_blue");
    }
    this.display();
    this.before_edit(id);
};

LotterySSQ.prototype.edit_select_dt = function(id){
    this.clear_all();
    // �������Ͷעҳǩ
    $("#dantuo_select").click();
    var pos = $("#select").offset().top;
    $("html,body").animate({scrollTop:pos}, 500);

    var datas = $("#num tbody tr#" + id).children("td").eq(1).text().split("[")[0].split(this.separator);
    var reddatas = datas[0].substr(1).split(")");
    var reds1 = reddatas[0].split(" ");
    var reds2 = reddatas[1].split(" ");
    var blues = datas[1].split(" ");

    for (var i = 0; i < reds1.length; i++) {
        // ʮ����
        var index = parseInt(reds1[i], 10);
        if (index > 0)
            this.select_ball_dt(this.red_balls1_dt[index - 1], "dt_red1");
    }
    for (var i = 0; i < reds2.length; i++) {
        // ʮ����
        var index = parseInt(reds2[i], 10);
        if (index > 0)
            this.select_ball_dt(this.red_balls2_dt[index - 1], "dt_red2");
    }
    for (var j = 0; j < blues.length; j++) {
        var index = parseInt(blues[j], 10);
        if (index > 0)
            this.select_ball_dt(this.blue_balls_dt[index - 1], "dt_blue");
    }
    this.display_info();
    this.before_edit_dt(id);
};

//ȷ���޸�
LotterySSQ.prototype.confirm_edit = function(id){

		if(this.check_rule_fs()){
				var reds = [];
				var blues = [];
				for(var i =0; i < 33; i ++ ){
					if(this.red_balls[i].className == "ball selected"){reds.push(this.red_balls[i].innerHTML)};
					if(i < 16){
						if(this.blue_balls[i].className == "ball selected"){blues.push(this.blue_balls[i].innerHTML)};
					}
				}

			if(!this.type){
                var type = (reds.length > 6 || blues.length > 1) ? "��ʽͶע" : "��ʽͶע";
                var num = reds.join(" ") + this.separator + blues.join(" ");
                if ($("#num tbody tr#" + id).length > 0) {
                    $("#num tbody tr#" + id).html("<td width='100'>" + type + "</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>["+ this.total +"ע " + this.total*2 + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select("+ id + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select("+ id + ")'>ɾ��</a></td>");
                } else {
                    this.row++;
                    $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>" + type + "</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>["+ this.total +"ע " + this.total*2 + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select("+ this.row + ")'>ɾ��</a></td></tr>");
                }

			}

                this.clear_ball($("#redball-list"));
		        this.clear_ball($("#blueball-list"));
		        this.display();
                this.after_edit();

			}
		else{
			alertTip(this.fs_alert_text);}

};

LotterySSQ.prototype.before_edit = function(id){
    $("#num tbody tr:gt(-1)").removeClass("sonor");
    $("#num tbody tr#" + id).addClass("sonor");
    // ȷ���޸İ�ť�İ��¼�
    get("btn-append").innerHTML = "ȷ���޸�";
    $("#btn-clear").hide();
    $("#btn-reselect").show();
    var __Ball = this;
    get("btn-append").onclick = function() {
        __Ball.confirm_edit(id);
        __Ball.total_num();
    };
};

LotterySSQ.prototype.after_edit = function(){
    // ȷ���޸ĺ�ԭ�¼�
    get("btn-append").innerHTML = "��ӵ�������";
    $("#btn-reselect").hide();
    $("#btn-clear").show();
    var __Ball = this;
    get("btn-append").onclick = function() {
        __Ball.confirm_select();
        __Ball.total_num();
    };
};

//ȷ���޸�
LotterySSQ.prototype.confirm_edit_dt = function(id){
    this.num_balls();

    if(this.check_rule_dt()){

        var bt1 = [];
		var bt2 = [];
		var bt3 = [];
		for(var i = 0; i < this.reds1_dt.length; i ++ ){
			bt1.push(this.reds1_dt[i].innerHTML);
		}
		for(var i = 0; i < this.reds2_dt.length; i ++ ){
			bt2.push(this.reds2_dt[i].innerHTML);
		}
		for(var i = 0; i < this.blues_dt.length; i ++ ){
			bt3.push(this.blues_dt[i].innerHTML);
		}

        var num = "(" + bt1.join(" ") +  ")" + bt2.join(" ") + this.separator + bt3.join(" ");
        if ($("#num tbody tr#" + id).length > 0) {
            $("#num tbody tr#" + id).html("<td width='100'>����Ͷע</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>[" + this.total_dt + "ע " + (this.total_dt * 2) + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select_dt("+ id + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select_dt("+ id + ")'>ɾ��</a></td>");
        } else {
            this.row++;
            $("#num tbody").append("<tr id='" + this.row + "'><td width='100'>����Ͷע</td><td width='250' class='al'><div title=\"" + num + "\">" + num + "</div></td><td width='110'>[" + this.total_dt + "ע " + (this.total_dt * 2) + "Ԫ]</td><td align='center' width='100'><a class='alert-ball' href='javascript:' onclick='ball.edit_select_dt("+ this.row + ")'>�޸�</a><a href='javascript:' onclick='ball.del_select_dt("+ this.row + ")'>ɾ��</a></td></tr>");
        }
    	this.total_num();
		this.clear_all();
		this.display_info();
        this.after_edit_dt();

	}else{alertTip(this.dt_alert_text);}
};

LotterySSQ.prototype.before_edit_dt = function(id){
    $("#num tbody tr:gt(-1)").removeClass("sonor");
    $("#num tbody tr#" + id).addClass("sonor");
    // ȷ���޸İ�ť�İ��¼�
    get("btn-append-dt").innerHTML = "ȷ���޸�";
    $("#btn-clear-dt").hide();
    $("#btn-reselect-dt").show();
    var __Ball = this;
    get("btn-append-dt").onclick = function() {
        __Ball.confirm_edit_dt(id);
        __Ball.total_num();
    };
};

LotterySSQ.prototype.after_edit_dt = function(){
    // ȷ���޸ĺ�ԭ�¼�
    get("btn-append-dt").innerHTML = "��ӵ�������";
    $("#btn-reselect-dt").hide();
    $("#btn-clear-dt").show();
    var __Ball = this;
    get("btn-append-dt").onclick = function() {
        __Ball.confirm_select_dt();
        __Ball.total_num();
    };
};

//��ȡһע���ŵ�session
LotterySSQ.prototype.get_oneFs = function(lotteryCategory){
    var allRedBall = this.getAllRedBall();
    var allBlueBall = this.getAllBlueBall();
    var randomRed = randomSelect(allRedBall, 6).sort();
    var randomBlue = randomSelect(allBlueBall, 1)[0];

    var item = {
        "type":0,
        "red":randomRed.join(),
        "blue":randomBlue,
        "totalstake":1
    };
    addLotteryItem(item);
	precardHtml();
	pretotalHtml();
}

//��ѡcountע���ŵ�session
LotterySSQ.prototype.get_fiveOrTenFs = function(count){
    for(var i = 0; i < count; i++) {
        var allRedBall = this.getAllRedBall();
        var allBlueBall = this.getAllBlueBall();    	
    	var randomRed = randomSelect(allRedBall, 6).sort();
    	var randomBlue = randomSelect(allBlueBall, 1)[0];
	    var item = {
	        "type":0,
	        "red":randomRed.join(),
	        "blue":randomBlue,
	        "totalstake":1
	    };
	    ssqLotteryObj.count += 1;
	    item["num"] = ssqLotteryObj.count;
	    ssqLotteryObj.lottery.push(item);
    }
    $("#cue_span").html("������������\"��ѡ\"��ť���»�ѡ" + count + "ע");
    if (count == 5) {
    	$("#rd_btn_reRandom10").hide();
    	$("#rd_btn_reRandom5").show();
    }
    if (count == 10) {
    	$("#rd_btn_reRandom5").hide();
    	$("#rd_btn_reRandom10").show();
    }    
    randomCardHtml(count);
    randomtotalHtml();
}

/** ���˫ɫ�����Ϣ */
function getRandomSSQCardHtml(count) {
	var arr = [];
	var item, ss;
	for ( var i = 0; i < ssqLotteryObj.lottery.length; i++) {
		item = ssqLotteryObj.lottery[i];
		arr.push("<li class=\"ss-lst-li\"><span class=\"new-tbl-type\">");
		arr.push("<span class=\"new-tbl-cell pop-num\"><a onclick=\"deleteRandomLotteryItem(" + count + "," + item.num + ");\" href=\"javascript:void(0)\" class=\"new-btn-close\">close</a></span>");
		ss = item.red.split(",");
		for ( var k = 0; k < ss.length; k++) {
			arr.push("<span class=\"new-tbl-cell pop-num\">" + ss[k] + "</span>");
		}
		ss = item.blue.split(",");
		for ( var k = 0; k < ss.length; k++) {
			arr.push("<span class=\"new-tbl-cell pop-num2\">" + ss[k] + "</span>");
		}
		arr.push("</li>");
	}
	return arr.join("");
}

/* ������ע�� */
function calssqtotalstake() {
	var count = 0;
	for ( var i = 0; i < ssqLotteryObj.lottery.length; i++) {
		count += ssqLotteryObj.lottery[i].totalstake;
	}
	return count;
}

/* pre�ܽ�� */
function randomtotalHtml() {
	var totalstake = calssqtotalstake();
	$("#random_text").html(
			"��" + totalstake + "ע����<span class=\"red\">��"
					+ totalstake * 2 + ".00</span>Ԫ");
}

function randomCardHtml(count) {
    var str = getRandomSSQCardHtml(count);
    if (count == 5) {
    	$("#randomInfo5").html(str);
    } else {
    	$("#randomInfo10").html(str);
    }
	if (ssqLotteryObj.lottery.length == 0) {// ���û���κ�Ͷע
		$("#rd_btn_append").hide();
	} else {
		$("#rd_btn_append").show();
	}	
	//$("#randomInfo").css("height", "246px");
	// ��ǰ��ʾ����
//	if (ssqLotteryObj.lottery.length > 5) {
//		$("#randomInfo").css("height", "246px");
//		h = $("#randomInfo").offset().top;
//		lastIndex = ssqLotteryObj.lottery.length -1;
//		var items=$("#randomInfo li");
//		var fisrtItem=items.eq(0);
//		var lastItem=items.eq(lastIndex);
//		document.getElementById("randomInfo").addEventListener("touchstart",
//				function(event) {
//					scrollStartPos = this.scrollTop + event.touches[0].pageY;
//					event.preventDefault();
//				}, false);
//
//		document.getElementById("randomInfo").addEventListener("touchmove",
//				function(event) {
//					this.scrollTop = scrollStartPos - event.touches[0].pageY;
//					event.preventDefault();
//					
//					var top=$(this).offset().top;
//				}, false);
//	} else {
//		$("#randomInfo").css("height", "auto");
//	}	
}

function deleteRandomLotteryItem(count,num) {
	for ( var i = 0; i < ssqLotteryObj.lottery.length; i++) {
		if (ssqLotteryObj.lottery[i].num == num) {
			ssqLotteryObj.lottery.splice(i, 1);
			break;
		}
	}
    randomCardHtml(count);
    randomtotalHtml();
}
