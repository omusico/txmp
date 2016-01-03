function LotteryDLT(){
	this. time = 0; //��ѡ����
	//this.zhu = 1;//ע��
    //this.row = 0; //�м�¼��
    this.separator = "|";
    this.money=2;

}
/**
 *@param arr:��������
 *@param selectQuantity:ѡ��ĸ���
 *@return ���ѡ����Ķ�������
 */
function randomSelect(arr, selectQuantity) {
    var result = [];
    for (var i = 0; i < selectQuantity; i++) {
		//��������±�
        var idx = Math.floor(Math.random() * arr.length);
		//�����ɵ��±�����Ӧ��Ԫ����ӵ�ѡ�õ����
        result[result.length] = arr[idx];
		//��arr���±�Ϊidx��Ԫ��ɾ������ֹ�����ظ�������
        arr.splice(idx, 1);
    }
    return result;
}
// һЩ���õķ�����
function CommonUtil(){
   CommonUtil.money=2;
  // CommonUtil.row=0;
   CommonUtil.zhu=1;
};

new CommonUtil();
CommonUtil.getMoney=function(){
     return CommonUtil.money;
}

CommonUtil.updateMoney=function(money){
    CommonUtil.money=money;
}
CommonUtil.combination = function(n, m) {
    if (n <= 0 || m <= 0 || m > n) {
        return 0;
    } else {
        var _divisor = 1;
        var _dividend = 1;
        var _temp = n;
        for (var j = 0; j < m; j++) {
            _dividend *= (j + 1);
            _divisor *= _temp--;
        }
        return _divisor / _dividend;
    }
};




//����͸���еĺ���
LotteryDLT.prototype.getAllRedBall = function(){
	return ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35"];
};
//����͸���е�����
LotteryDLT.prototype.getAllBlueBall = function(){
	return ["01","02","03","04","05","06","07","08","09","10","11","12"];
};


 LotteryDLT.prototype.get_zhu = function(){
    var total = 0;
	var n1 = this.reds1_dt.length;
	var n2 = this.reds2_dt.length;
	var n3 = this.blues1_dt.length;
	if(n1 > 0 && n1 < 6 && n2 > 1 && (n1 + n2) > 6 && n3 >0){

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
	}
	else{this.total_dt = 0}
};
//��ʽͶע���ѡ��
// todo ��ȡ�������С�
LotteryDLT.prototype.random_select = function(s, color) {

    var result;
    if (color == 0) { //����
		//�������s����
        result = randomSelect(this.getAllRedBall(), s);
		//�������ѡ�е���
        this.clear_ball($("#fs-redball-list"));
		//��ѡ�е�����Ϊѡ��״̬
        for (var i = 0; i < s; i ++) {
		//parseInt(number,type)��������������������2����������ʾ���ƵĻ���Ĭ����10���ơ�
            this.red_balls[parseInt(result[i], 10) - 1].className = "ball selected";
        }
        this.red_num=s;
        this.display();
    }

    else {
        result = randomSelect(this.getAllBlueBall(), s);
        this.clear_ball($("#fs-blueball-list"));
        for (var i = 0; i < s; i ++) {
            this.blue_balls[parseInt(result[i], 10) - 1].className = "ball selected";
        }
        this.blue_num = s;
        this.display();
    }

};

//�����ռ䡣
var concreteness={};

//==================================================================����͸�еĸ�ʽͶע�ķ�����=====================================
concreteness.Fs=function(){
//    LotteryDLT.call(this);
//	this.maxAmount=20000;
    this.red_num = 0;//��ʽͶע��ʽ�ĺ������
    this.blue_num = 0;//��ʽͶע��ʽ���������
    this.max_red_num=16;
    this.red_balls = $("#fs-redball-list li div.ball");
    this.blue_balls = $("#fs-blueball-list li div.ball");
    this.init();
};

concreteness.Fs.prototype= new LotteryDLT();
concreteness.Fs.prototype.constructor=concreteness.Fs;
concreteness.Fs.prototype.init=function(){
    var __Ball = this;
    //�󶨸��ְ����¼�
    this.fs_bind();

	//��ӵ�������
    get("btn-append-fs").onclick = function() {
        __Ball.confirm_select();
    };
    //���ѡn������
    get("randomnum-red").onchange = function(){
    	var value=get('randomnum-red').value;
    	
    	var zhu=CommonUtil.combination(value, 5) * CommonUtil.combination(__Ball.blue_num, 2);
    	if((caltotalstake()+zhu)*2>maxAmount){
    		alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
    		$("#randomnum-red").val(0);
    		return;
    	}
    	__Ball.random_select(value,0);
    
    };
    
    get("randomnum-blue").onchange = function(){
    	var value=get('randomnum-blue').value;
    	var zhu=CommonUtil.combination(__Ball.red_num, 5) * CommonUtil.combination(value, 2);
    	if((caltotalstake()+zhu)*2>maxAmount){
    		$("#randomnum-blue").val(0);
    		alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
    		return;
    	}
    	__Ball.random_select(value,1);
    	
    };
	//��ѡһע
    get("btn-random-fs").onclick = function() {
    	$("#randomnum-red").val(5);
    	$("#randomnum-blue").val(2);
    	__Ball.random_select(5, 0);
    	__Ball.random_select(2, 1);
    };
    get("btn-clear-fs").onclick = function() {
    	
    	 $("#randomnum-red").val(0);
         $("#randomnum-blue").val(0);
    	 __Ball.clear_ball($("#fs-redball-list"));
    	 __Ball.clear_ball($("#fs-blueball-list"));
    	 __Ball.display();
    };


}
/**
 *����͸��ѡnע
 */
LotteryDLT.prototype.random_fs = function(n){
		this.random_fs1(n);
		precardHtml();
		pretotalHtml();
};

LotteryDLT.prototype.random_fs1 =function(n){
	for(var k = 0; k < n; k++){
        var allRedBall = this.getAllRedBall();
        var allBlueBall = this.getAllBlueBall();
        var randomRed = randomSelect(allRedBall,5).sort();
        var randomBlue = randomSelect(allBlueBall, 2).sort();
    	var item = {
    	        "type":0,
    	        "red":randomRed.join(),
    	        "blue":randomBlue.join(),
    	        "totalstake":1
    	    };
    	addLotteryItem(item);
	}	
};


concreteness.Fs.prototype.fs_bind = function() {
    var __Ball = this;
    for (var i = 0; i < 35; i ++) {
        __Ball.red_balls[i].onclick = function() {
     
        	$("#randomnum-red").val(0);
            __Ball.select_ball(this, "fs_red");
            __Ball.display();
        };//��ʽͶע����
        if (i < 12) {
            __Ball.blue_balls[i].onclick = function() {
            	$("#randomnum-blue").val(0);
                __Ball.select_ball(this, "fs_blue");
                __Ball.display();
            };//��ʽͶע����
        }
    }
};
//ѡ��˫ɫ��
concreteness.Fs.prototype.select_ball = function(ball, type) {

    var __Ball = this;

  
    switch (type) {
        //��ʽͶע����
        case "fs_red" :
            if (ball.className == "ball selected") {
                ball.className = "ball";
                __Ball.red_num --;
            } else {
            	if(__Ball.red_num>=__Ball.max_red_num){
            		alertTip("����ѡ��"+__Ball.max_red_num+"����!");
            		return;
            	}else{
            		 __Ball.red_num ++;
            		 this.total = CommonUtil.combination(this.red_num, 5) * CommonUtil.combination(this.blue_num, 2);
            		  if((caltotalstake()+this.total) *this.money >maxAmount){
            			    __Ball.red_num --; //��ȥ��ӵ�
            		    	alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
            		    	return;
            		  }
            		  ball.className = "ball selected";                     
            	}
            }
            break;
        //��ʽͶע����
        case "fs_blue" :
            if (ball.className == "ball selected") {
                ball.className = "ball";
                __Ball.blue_num --;
            } else {
            	 __Ball.blue_num ++;
            	 this.total = CommonUtil.combination(this.red_num, 5) * CommonUtil.combination(this.blue_num, 2);
       		  if((caltotalstake()+this.total) *this.money >maxAmount){
       			    __Ball.blue_num --; //��ȥ��ӵ�
       		    	alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
       		    	return;
       		  }
                ball.className = "ball selected";
               
            }
            break;
    }
    
    this.total = CommonUtil.combination(this.red_num, 5) * CommonUtil.combination(this.blue_num, 2);
    if((caltotalstake()+this.total) *this.money >maxAmount){
    	alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
    	return;
    }

};

//��ʾ��ѡ��˫ɫ����Ϣ
concreteness.Fs.prototype.display = function() {
    this.total = CommonUtil.combination(this.red_num, 5) * CommonUtil.combination(this.blue_num, 2);

    get("fs_text").innerHTML =  this.red_num + "��ǰ�����룬" + this.blue_num + "���������룬��<span class='red' id='total-zhu'>" + this.total + "</span>ע����<span class='red' id='total-money'>��" + this.total *this.money + ".00</span>Ԫ";
};

 //�����ѡ����
concreteness.Fs.prototype.clear_ball = function(obj){

	var ball = obj.find("li div.ball");
	for(var i =0; i < ball.length; i ++ ){
		ball[i].className = "ball";
	}

	switch(obj[0].id){
		case "fs-redball-list" : this.red_num = 0; break;
		case "fs-blueball-list" : this.blue_num = 0; break;
	}
};

//ȷ��ѡ��
concreteness.Fs.prototype.confirm_select = function(){
    if(this.check_rule_fs()){
				var reds = [];
				var blues = [];
				for(var i =0; i < 35; i ++ ){
					if(this.red_balls[i].className == "ball selected"){reds.push(this.red_balls[i].innerHTML)};
					if(i < 12){
						if(this.blue_balls[i].className == "ball selected"){blues.push(this.blue_balls[i].innerHTML)};
					}
				}
				var type=0;
				var item = {
						"type":type,
						"red":reds.join(),//����
						"blue":blues.join(),//����
						"totalstake":this.total  //ע��
					};
				addLotteryItem(item);
		        this.clear_ball($("#fs-redball-list"));
		        this.clear_ball($("#fs-blueball-list"));
		        this.display();
		        btu();
			}
		else{alertTip(this.fs_alert_text);}

};

//��ʾ��ѡ��˫ɫ����Ϣ
concreteness.Fs.prototype.display = function() {
    if(this.red_num > 4 && this.red_num < 17 && this.blue_num > 0) {
        this.total = CommonUtil.combination(this.red_num, 5) * CommonUtil.combination(this.blue_num, 2);
    }
    else{ this.total = 0 ;}

    get("fs_text").innerHTML = this.red_num + "��ǰ�����룬" + this.blue_num + "���������룬��<span class='red' id='total-zhu'>" + this.total + "</span>ע����<span class='red' id='total-money'>��" + this.total *this.money + ".00</span>Ԫ";
};


 /*
��ʽͶע����

����:����ѡ��6�������20��
����:����ѡ��1��
*/
concreteness.Fs.prototype.check_rule_fs = function(){
		this.fs_alert_text = "";
		if(this.red_num < 5){this.fs_alert_text += "����ѡ��5��ǰ������<br />";}
		if(this.red_num > 16){this.fs_alert_text += "���ѡ��16��ǰ������<br />";}
		if(this.blue_num < 2 ){this.fs_alert_text += "����ѡ��2����������<br />"}
        if((this.total+caltotalstake())*2 > maxAmount){this.fs_alert_text += "��Ͷע���ܳ���" + maxAmount + "Ԫ<br />"}
		if(this.fs_alert_text != "" ){return false;}
		else{return true;}
};

//========================================================================����==========================================================================
concreteness.Dantuo=function(){
//     LotteryDLT.call(this);
    this.reds1_dt = []; // ѡ�еĺ�����
    this.reds2_dt = []; // ѡ�еĺ�������
    this.blues1_dt = []; // ѡ�е�����
    this.blues2_dt=[];// ѡ�еĺ������롣
    this.before_type=0; // ǰ�� ����0 ������ 1 ��������
    this.after_type=0; // ���� ����0 ������ 1 ��������
    this.total_dt = 1;
    this.red_balls_dt = $("#dantuo-redball-list li div.ball");
    this.blue_balls_dt = $("#dantuo-blueball-list li div.ball");
    this.init();
}
concreteness.Dantuo.prototype= new LotteryDLT();
concreteness.Dantuo.prototype.constructor=concreteness.Dantuo;
//�����淨
concreteness.Dantuo.prototype.init = function() {
    var __Ball = this;

    //����
    for (var i = 0; i < __Ball.red_balls_dt.length; i ++) {
        __Ball.red_balls_dt[i].index = i;
        __Ball.red_balls_dt[i].onclick = function() {
        	
            __Ball.select_ball_dt(this, "dt_red");
            __Ball.display_info();
        }
    }


    //����
    for (var i = 0; i < __Ball.blue_balls_dt.length; i ++) {
        __Ball.blue_balls_dt[i].index = i;
        __Ball.blue_balls_dt[i].onclick = function() {
        	
            __Ball.select_ball_dt(this, "dt_blue");
            __Ball.display_info();
        }
    }


    
    get("dan-before").onclick = function(){
        get(this.id).className = 'curr curr-f';
        get('tuo-before').className = '';
        get('red_ga').innerHTML='ǰ������';
        get('blue_ga').innerHTML='��������';
        get('before-gray').innerHTML = '����ѡ��1�����룬���ѡ��4������';
        get('after-gray').innerHTML = '���ѡ��1������';
        __Ball.danma_before();
        __Ball.danma_after();
    }
    
    get("tuo-before").onclick = function(){
        get(this.id).className = 'curr curr-r';
        get('dan-before').className = '';
        get('red_ga').innerHTML='ǰ������';
        get('blue_ga').innerHTML='��������';
        get('before-gray').innerHTML = '����ѡ��2������';
        get('after-gray').innerHTML = '����ѡ��2������';
        __Ball.tuoma_before();
        __Ball.tuoma_after();
    }
   /* get("dan-after").onclick = function(){
        get(this.id).className = 'curr curr-f';
        get('tuo-after').className = '';
        get('after-gray').innerHTML = '����1������';
        __Ball.danma_after();
    }
    
    get("tuo-after").onclick = function(){
        get(this.id).className = 'curr curr-r';
        get('dan-after').className = '';
        get('after-gray').innerHTML = '����ѡ��2������';
        __Ball.tuoma_after();
    }*/
    //����Ϸ�ѡ��
   get("btn-clear-dantuo").onclick = function() {
        __Ball.clear_all();
        __Ball.display_info();
    };

    //ȷ��ѡ��
    get("btn-dantuo-append").onclick = function() {
        __Ball.confirm_select_dt();
    };

};

concreteness.Dantuo.prototype.danma_before = function(){
	
  if(this.before_type==1){ //���һ��ʼΪ ����״̬

	  for(var i = 0; i < this.reds2_dt.length; i ++ ){
          this.reds2_dt[i].className == "ball selected" ? this.reds2_dt[i].className = "ball dantuo" :this.reds2_dt[i].className = "ball selected" ;
      }
      for(var i = 0; i < this.reds1_dt.length; i ++ ){
          this.reds1_dt[i].className == "ball dantuo" ? this.reds1_dt[i].className = "ball selected" :this.reds1_dt[i].className = "ball dantuo" ;
      }
  }
  this.before_type = 0;
}
concreteness.Dantuo.prototype.danma_after = function(){

	  if(this.after_type==1){ //���һ��ʼΪ ����״̬

		  for(var i = 0; i < this.blues2_dt.length; i ++ ){
	          this.blues2_dt[i].className == "ball selected" ? this.blues2_dt[i].className = "ball dantuo" :this.blues2_dt[i].className = "ball selected" ;
	      }
	      for(var i = 0; i < this.blues1_dt.length; i ++ ){
	          this.blues1_dt[i].className == "ball dantuo" ? this.blues1_dt[i].className = "ball selected" :this.blues1_dt[i].className = "ball dantuo" ;
	      }
	  }
	  this.after_type = 0;
	}

concreteness.Dantuo.prototype.tuoma_before = function(){

  if(this.before_type==0){

	  for(var i = 0; i < this.reds1_dt.length; i ++ ){
          this.reds1_dt[i].className == "ball selected" ? this.reds1_dt[i].className = "ball dantuo" :this.reds1_dt[i].className = "ball selected" ;
      }
      for(var i = 0; i < this.reds2_dt.length; i ++ ){
          this.reds2_dt[i].className == "ball dantuo" ? this.reds2_dt[i].className = "ball selected" :this.reds2_dt[i].className = "ball dantuo" ;
      }
  }
  this.before_type = 1;
}
concreteness.Dantuo.prototype.tuoma_after = function(){

	  if(this.after_type==0){

		  for(var i = 0; i < this.blues1_dt.length; i ++ ){
	          this.blues1_dt[i].className == "ball selected" ? this.blues1_dt[i].className = "ball dantuo" :this.blues1_dt[i].className = "ball selected" ;
	      }
	      for(var i = 0; i < this.blues2_dt.length; i ++ ){
	          this.blues2_dt[i].className == "ball dantuo" ? this.blues2_dt[i].className = "ball selected" :this.blues2_dt[i].className = "ball dantuo" ;
	      }
	  }
	  this.after_type = 1;
	}

 concreteness.Dantuo.prototype.confirm_select_dt = function(){
    this.num_balls();
    if((caltotalstake()+this.total_dt)*this.money>maxAmount){
    	alertTip("��Ͷע���ܳ���"+ maxAmount + "Ԫ<br />");
    	return;
    }
	if(this.check_rule_dt()){
        var bt1 = [];
		var bt2 = [];
		var bt3 = [];
        var bt4=[];
		for(var i = 0; i < this.reds1_dt.length; i ++ ){
			bt1.push(this.reds1_dt[i].innerHTML);
		}
		for(var i = 0; i < this.reds2_dt.length; i ++ ){
			bt2.push(this.reds2_dt[i].innerHTML);
		}
		for(var i = 0; i < this.blues1_dt.length; i ++ ){
			bt3.push(this.blues1_dt[i].innerHTML);
		}
        for(var i = 0; i < this.blues2_dt.length; i ++ ){
			bt4.push(this.blues2_dt[i].innerHTML);
		}
        var type=1;
        
    	var item = {
				"type":type,
				"red_before":bt1.join(),//ǰ������
				"red_after":bt2.join(), //ǰ������
				"blue_before":bt3.join(),
				"blue_after":bt4.join(),//����		
				"totalstake":this.total_dt  //ע��
			};
    	addLotteryItem(item);
    	//this.total_num();
		this.clear_all();
		this.display_info();
		btu();
	}else{alertTip(this.dt_alert_text);}
};





//���������
concreteness.Dantuo.prototype.clear_all = function(){
	for(var i = 0; i < 35; i ++ ){
		this.red_balls1_dt[i].className = "ball";
		this.red_balls2_dt[i].className = "ball";
		if(i < 12){
			this.blue_balls1_dt[i].className = "ball";
            this.blue_balls2_dt[i].className = "ball";
		}
	}
};
 /*
����Ͷע����
*/
concreteness.Dantuo.prototype.check_rule_dt = function(){
    this.dt_alert_text = "";

    //�ж�ǰ��
    if(this.reds1_dt.length + this.reds2_dt.length < 6){
        this.dt_alert_text += "ǰ����������벻������6��<br />";
    }
    //�ж�ǰ������
    if(this.reds1_dt.length < 1){
        this.dt_alert_text += "����ѡ��1��ǰ������<br />";
    }
    if(this.reds1_dt.length > 4){
        this.dt_alert_text += "���ѡ��4��ǰ������<br />";
    }
    //�ж�ǰ������
    if(this.reds2_dt.length < 2){
        this.dt_alert_text += "����ѡ��2��ǰ������<br />";
    }
    //�жϺ�������
    if(this.blues1_dt.length > 1){
        this.dt_alert_text += "���ѡ��1����������<br />";
    }
    //�жϺ�������
    if(this.blues2_dt.length < 2){
        this.dt_alert_text += "����ѡ��2����������<br />";
    }

   // if(this.total_dt*2 > maxAmount){this.dt_alert_text += "��ע���ܳ���"+ maxAmount + "Ԫ<br />"}
	if(this.dt_alert_text != ""){return false;}
    else{return true;}
};
//���������
concreteness.Dantuo.prototype.clear_all = function(){
	for(var i = 0; i < 35; i ++ ){
		this.red_balls_dt[i].className = "ball";	
		if(i < 12){
			this.blue_balls_dt[i].className = "ball";
        }
	}
};
concreteness.Dantuo.prototype.display_info = function(){
    this.num_balls();
    if (this.check_rule_dt()) {
        this.total_dt= this.getZhuNum();
    }
    else{this.total_dt = 0}
    get("dantuo_text").innerHTML = (this.reds1_dt.length + this.reds2_dt.length) + "��ǰ������("
            + this.reds1_dt.length + "������," + this.reds2_dt.length + "������)��" + (this.blues1_dt.length +this.blues2_dt.length)+ "" +
            "����������("+this.blues1_dt.length+"������,"+this.blues2_dt.length+"������"+")��" +
            "��<span class='red' id='total-zhu-dt'>" + this.total_dt + "</span>ע��" +
            "��<span class='red' id='total-money-dt'>��" + (this.total_dt * this.money) + ".00</span>Ԫ";
};

concreteness.Dantuo.prototype.getZhuNum=function(){
        return CommonUtil.combination(this.reds2_dt.length, 5 - this.reds1_dt.length) *
            CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length) ;
}

//��Tab��ʾѡ����Ϣ
/*
concreteness.Dantuo.prototype.num_balls = function(){
    var __Ball = this;
	this.reds1_dt = [];
	this.reds2_dt = [];
	this.blues1_dt = [];
    this.blues2_dt=[];
    if (__Ball.before_type==0){ //ǰ������ѡ��
        for(var i = 0; i < 35; i ++ ){
            if(__Ball.red_balls_dt[i].className == "ball selected"){
            	
                this.reds1_dt.push(__Ball.red_balls_dt[i]);
            }else if(__Ball.red_balls_dt[i].className == "ball dantuo"){
                this.reds2_dt.push(__Ball.red_balls_dt[i]);
            }
            
            
        }
    }else{
    	for(var i = 0; i < 35; i ++ ){
            if(__Ball.red_balls_dt[i].className == "ball selected"){
                this.reds2_dt.push(__Ball.red_balls_dt[i]);
            }else if(__Ball.red_balls_dt[i].className == "ball dantuo"){
                this.reds1_dt.push(__Ball.red_balls_dt[i]);
            }
        }
    }
    
    if (__Ball.after_type==0){
        for(var i = 0; i < 12; i ++ ){
            if(__Ball.blue_balls_dt[i].className == "ball selected"){
                this.blues1_dt.push(__Ball.blue_balls_dt[i]);
            }else if(__Ball.blue_balls_dt[i].className == "ball dantuo"){
                this.blues2_dt.push(__Ball.blue_balls_dt[i]);
            }
        }
    }else{
    	for(var i = 0; i < 12; i ++ ){
            if(__Ball.blue_balls_dt[i].className == "ball selected"){
                this.blues2_dt.push(__Ball.blue_balls_dt[i]);
            }else if(__Ball.blue_balls_dt[i].className == "ball dantuo"){
                this.blues1_dt.push(__Ball.blue_balls_dt[i]);
            }
        }
    }

};
*/

//��Tab�Ż���ʾѡ�������Ϣ
concreteness.Dantuo.prototype.num_balls = function(){
  var __Ball = this;
	this.reds1_dt = [];
	this.reds2_dt = [];
	this.blues1_dt = [];
  this.blues2_dt=[];
  if (__Ball.before_type==0){ //ǰ������ѡ��
      for(var i = 0; i < 35; i ++ ){
          if(__Ball.red_balls_dt[i].className == "ball selected"){	
              this.reds1_dt.push(__Ball.red_balls_dt[i]);
          }else if(__Ball.red_balls_dt[i].className == "ball dantuo"){
              this.reds2_dt.push(__Ball.red_balls_dt[i]);
          }
          if(i<12){  //С��12 ������Ӧ�ĺ���
        	  if(__Ball.blue_balls_dt[i].className == "ball selected"){
                  this.blues1_dt.push(__Ball.blue_balls_dt[i]);
              }else if(__Ball.blue_balls_dt[i].className == "ball dantuo"){
                  this.blues2_dt.push(__Ball.blue_balls_dt[i]);
              }
          } 
      }
  }else{
  	for(var i = 0; i < 35; i ++ ){
          if(__Ball.red_balls_dt[i].className == "ball selected"){
              this.reds2_dt.push(__Ball.red_balls_dt[i]);
          }else if(__Ball.red_balls_dt[i].className == "ball dantuo"){
              this.reds1_dt.push(__Ball.red_balls_dt[i]);
          }
          if(i<12){
        	  if(__Ball.blue_balls_dt[i].className == "ball selected"){
                  this.blues2_dt.push(__Ball.blue_balls_dt[i]);
              }else if(__Ball.blue_balls_dt[i].className == "ball dantuo"){
                  this.blues1_dt.push(__Ball.blue_balls_dt[i]);
              } 
          }
      }
  }
};


concreteness.Dantuo.prototype.select_ball_dt = function(ball,type){
	var zhu=0;
   this.num_balls();
   switch(type){
		case "dt_red" :
			if(ball.className=="ball selected"){ //����ȡ������
				if(this.before_type==0){
					if(this.reds1_dt.length>1&&this.blues1_dt.length!=0&&this.blues2_dt.length>1&&this.reds2_dt.length!=0){
						zhu=CommonUtil.combination(this.reds2_dt.length, 5 - (this.reds1_dt.length-1)) *
	                    CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length);
					}				
					//if(this.blues1_dt.length!=0&&this.blues2_dt.length!=0&&this.reds1_dt.length>1)
					//zhu=CommonUtil.combination(this.reds2_dt.length, 5 - (this.reds1_dt.length-1)) *
                   // CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length);
				}else{
					//if(this.select_dantuo_rule())
					if(this.blues1_dt.length!=0&&this.blues2_dt.length>1&&this.reds1_dt.length!=0)
					zhu=CommonUtil.combination(this.reds2_dt.length-1, 5 - this.reds1_dt.length) *
                    CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length);
				}
			
				
				if((caltotalstake()+zhu)* this.money>maxAmount){
					alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
					return;
				}
				ball.className="ball";
				
			}else if(ball.className=="ball"){
				if(this.before_type==0){  //����ѡ��
					if(this.reds1_dt.length==4){
						alertTip("����ѡ��4��ǰ������!");
						return;
					}
			
					if(this.blues1_dt.length!=0&&this.blues2_dt.length>1&&this.reds2_dt.length!=0)  //����ɫ���򶼷���Ҫ��
					//if(this.select_dantuo_rule())
					zhu=CommonUtil.combination(this.reds2_dt.length, 5 - (this.reds1_dt.length+1)) *
	                     CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length);
				}else{
			
					if(this.blues1_dt.length!=0&&this.blues2_dt.length>1&&this.reds1_dt.length!=0)
					//if(this.select_dantuo_rule())
				    zhu=CommonUtil.combination(this.reds2_dt.length+1, 5 - this.reds1_dt.length) *
                    CommonUtil.combination(this.blues2_dt.length, 2 - this.blues1_dt.length);	
				}
				if((caltotalstake()+zhu) * this.money>maxAmount){
					alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
					return;
			   }
				ball.className = "ball selected";
			}
			this.trim_repeat(this.red_balls_dt,ball.index);
		break;
		case "dt_blue" :
			if(ball.className=="ball selected"){ //����ȡ������
				
				if(this.before_type==1){  //����ѡ��
					if(this.blues1_dt.length!=0&&this.reds1_dt.length!=0&&this.reds2_dt.length!=0) //���ѡ���˺�������
					zhu=CommonUtil.combination(this.reds2_dt.length, 5 - this.reds1_dt.length) *
                    CommonUtil.combination((this.blues2_dt.length-1), 2 - this.blues1_dt.length);
				}
				if((caltotalstake()+zhu) * this.money>maxAmount){
					alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
					return;
			   }
				ball.className="ball";
			}else if(ball.className=="ball"){
				
				if(this.before_type==0){  //����ѡ��
					if(this.blues1_dt.length==1){
						alertTip("���ѡ��1����������!");
						return;
					}
			
					if(this.reds1_dt.length!=0&&this.reds2_dt.length!=0&&this.blues2_dt.length>1)  //����ɫ���򶼷���Ҫ��
					//if(this.select_dantuo_rule())
					zhu=CommonUtil.combination(this.reds2_dt.length, 5 - this.reds1_dt.length) *
                    CommonUtil.combination(this.blues2_dt.length, 2 - (this.blues1_dt.length+1));
				}else{
			
					if(this.blues1_dt.length!=0&&this.reds1_dt.length!=0&&this.reds2_dt.length!=0) //���ѡ���˺�������
						zhu=CommonUtil.combination(this.reds2_dt.length, 5 - this.reds1_dt.length) *
	                    CommonUtil.combination(this.blues2_dt.length+1, 2 - this.blues1_dt.length);

				}
				if((caltotalstake()+zhu) * this.money>maxAmount){
					alertTip("��Ͷע���ܳ���" + maxAmount + "Ԫ!");
					return;
			   }
				ball.className = "ball selected";
			}
            this.trim_repeat(this.blue_balls_dt,ball.index);
		break;
	}

};

concreteness.Dantuo.prototype.select_dantuo_rule=function(type){
	if(this.reds1_dt.length==0)
		return false;
	if(this.reds2_dt.length==0)
		return false;
	if(this.blues1_dt.length==0)
		return false;
	if(this.blues2_dt.length==0)
		return false;
	return true;
}
//ȥ���ظ�
concreteness.Dantuo.prototype.trim_repeat = function(obj,index){
	if(obj[index].className == "ball dantuo"){
        var str = '';
        
        if ($('#red_ga').html().indexOf('����')>0){
            str = '����';
        }else{
            str = '����';
        }
        alertTip("�˺����ѱ�"+str+"ѡ��!");
      //  $('#jd_title').html('�˺����ѱ�'+str+'ѡ�С�');
       // $('#jd_title').show();
    }
};
