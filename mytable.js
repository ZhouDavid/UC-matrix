var col_num;
var row_num;
var rid=0;
var colid = 3;
var init_col_num=4;
var table;
var isActive=new Array();//维护哪些列是显示哪些不显示

var row_str="<div class='row'><div class='col-md-6' contenteditable='true'>"+rid.toString()+"</div><div class='col-md-6'>　<input id='rcheck_"+rid.toString()+"'"+" type='checkbox'></div></div>";
$(document).ready(function() {
	table = $('#example').DataTable();
	col_num = 1;
	row_num = 0;
	rid = row_num;
	for (var i=0;i<init_col_num;i++){
		isActive[i]=1;
	}

	var titles = $('#header').children();
	for(var i = 0;i<titles.length;i++){
		var hid = 'h'+i.toString();
		$(titles[i]).attr('id',hid);
	}

	for(var i=init_col_num;i<table.columns().count();i++){
		table.columns(i).visible(false);
		isActive[i]=0;
	}
} );

 var addRow = function(){
 	var record = new Array();
 	row_num++;
 	rid++;
 	record[0]="<div class='row'><div class='col-md-8' contenteditable='true'>"+rid.toString()+"</div><div class='col-md-2'><input id='rcheck_"+rid.toString()+"'"+"  type='checkbox'/></div></div>";
 	for (var i = 1;i<table.columns().count();i++){
 		record[i]='C';
 	}
 	var id="row_"+rid.toString();
 	var node=table.row.add(record).draw().node();
 	$(node).attr("id",id);
 	var childs = $(node).children();

 	for(var i = 1;i<table.columns().count();i++){   //除了每行的第一个元素其他均设置为可编辑
 		$(childs[i]).attr('contenteditable','true');
 	}

 	$(node).children().eq(0).addClass('success');
 }

 var deleteRows = function(){
 	table.rows().every(function(rowIdx, tableLoop, rowLoop){
 		var node = this.node();
 		var checkid="#rcheck_"+get_check_id($(node).attr('id'));
 		if($(checkid).is(':checked')){
 			$(node).addClass('delete');
 			row_num--;
 		}
 	});
 	table.rows('.delete').remove().draw();

 }

var get_check_id = function(s){
	var ans="";
	for(i=0;i<s.length;i++){
		if(s[i]<='9'&&s[i]>='0')
			ans+=s[i];
	}
	return ans;
}

var addCol = function(){
	for(var i=0;i<table.columns().count();i++){
		if(isActive[i]===0){
			table.columns(i).visible(true);
			table.columns(i).nodes().flatten().to$().attr('contenteditable','true');
			isActive[i]=1;
			break;
		}

	}
}

var deleteCols=function(){
	var titles = $('#header').children();
	var checkid;
	for(var i=1;i<titles.length;i++){
		var cid = $(titles[i]).attr('id');
		cid = get_check_id(cid);
		checkid = '#ccheck_'+cid;
		if($(checkid).is(':checked')){
			table.columns(parseInt(cid)).visible(false);
			isActive[parseInt(cid)]=0;
		}
	}
}