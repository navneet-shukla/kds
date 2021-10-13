import {Component, OnInit, OnChanges} from '@angular/core';
import {UserService} from '../user.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ValidatorList} from '../../../shared/validator.service';
import {formatDate} from '@angular/common';
import {environment} from '../../../../environments/environment';
import * as io from 'socket.io-client';
import * as moment from 'moment';

declare var $: any
declare let epson: any;

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit, OnChanges {
    defaultChecked:any = []
    userId: any
    userRole: any
    userData: any
    token: any
    getRoute: any
    orders: any
    categories: any
    className: any
    orderListFilterForm: FormGroup
    restaurantId: any
    private socket: SocketIOClient.Socket;
    orderCommentId: any
    tableId: any
    ticketId: any
    customerName: any
    orderComments: any
    categStr: string
    // epson:{}
    printOrder: any
    customOptions: any = {
        loop: true,
        margin: 0,
        autoplay: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            900: {
                items: 2,
                nav: true
            },
            1200: {
                items: 3,
                nav: true,
                loop: false
            }
        }

    }
    checkCategAllFilter: boolean = true
    bg = ['green', 'yellow', 'gold', 'blue-diamond', 'light-blue'];
    socketUrl = environment.socketUrl;
    constructor(
        private formBuilder: FormBuilder,
        private UserService: UserService,
        private route: Router
    ) {
        // this.socket = io.connect('http://35.200.183.215:3002/');
        this.socket = io.connect(this.socketUrl);
        this.orderListFilterForm = this.formBuilder.group({
            categoryId: this.formBuilder.array([]),
            categoryIdTemp: this.formBuilder.array([]),
            restaurantId: new FormControl(null),
            type: this.formBuilder.array([0, 1, 2]),
        });

    }


    public account_validation_messages = ValidatorList.account_validation_messages
     beep() {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }


    ngOnInit() {

        this.userData = JSON.parse(localStorage.getItem('userData'))
        this.token = JSON.parse(localStorage.getItem('token'))
        this.orderFunctionInit();
        this.socket.on('connect', (msg: any) => {
            this.socket.emit('login', this.userData['userId'], this.restaurantId)
        });
        this.socket.on('order_message', (msg: any) => {
			let restaurantId = this.restaurantId;
			if(msg.message.restaurantId == restaurantId) {
            if (msg.message.id) {
                this.printReceipt(msg.message.id);
            }
			}

        });
        var categIdd = this.orderListFilterForm.value.categoryId;
        let orderType = this.orderListFilterForm.value.type;

        this.socket.on('order_item_beep', (msg: any) => {
			let restaurantId = this.restaurantId;
			if(msg.message.restaurantId == restaurantId) {
            console.log("hello beep",msg)
            this.beep();
			}
        });
        this.socket.on('notification_message', (msg: any) => {
            var categIdd = (this.orderListFilterForm.value.categoryId[0].length == undefined) ? this.orderListFilterForm.value.categoryId : this.orderListFilterForm.value.categoryId[0];
            let orderType = this.orderListFilterForm.value.type;
            let restaurantId = this.restaurantId;

            var orderArr = Array();
            msg.message.forEach(function (value) {
                if(value.restaurantId == restaurantId) {
                    if (orderType.length == 0 && categIdd.length == 0) {
                        var orderItemArr = Array();
                        value.items.forEach(function (itemValue) {
                            orderItemArr.push(itemValue)
                        });
                        if (orderItemArr.length > 0) {
                            value.items = orderItemArr;
                            orderArr.push(value)
                        }
                    } else if (orderType.length == 0 && categIdd.length > 0) {
                        var orderItemArr = Array();
                        value.items.forEach(function (itemValue) {
                            if (categIdd.indexOf(itemValue.categoryId) > -1)
                                orderItemArr.push(itemValue)
                        });
                        if (orderItemArr.length > 0) {
                            value.items = orderItemArr;
                            orderArr.push(value)
                        }
                    } else if (orderType.length > 0 && categIdd.length == 0) {
                        if (orderType.indexOf(value.consumptionMode) > -1) {
                            var orderItemArr = Array();
                            value.items.forEach(function (itemValue) {
                                orderItemArr.push(itemValue)
                            });
                            if (orderItemArr.length > 0) {
                                value.items = orderItemArr;
                                orderArr.push(value)
                            }
                        }
                    } else if ((orderType.length > 0) && (categIdd.length > 0)) {
                        var orderIndexVal = orderType.indexOf(value.consumptionMode);
                        if (orderIndexVal >= 0) {
                            var orderItemArr = Array();
                            value.items.forEach(function (itemValue) {
                                if (categIdd.indexOf(itemValue.categoryId) > -1)
                                    orderItemArr.push(itemValue)
                            });
                            if (orderItemArr.length > 0) {
                                value.items = orderItemArr;
                                orderArr.push(value)
                            }
                        }
                    }
                }
            });

            this.orders = orderArr;
        });

    }

    ngOnChanges() {
    }

    socketCounter() {

    }

    orderFunctionInit() {

        if (this.userData != 'undefined' && this.token != 'undefined' && this.userData != null && this.token != null) {
            this.userId = this.userData['userId'];
            this.restaurantId = this.userData['restaurantId'];


            this.orderListFilterForm.patchValue({
                restaurantId: this.restaurantId,
            });
            this.getCategories()
            // this.getOderListing()
        } else {
            localStorage.clear();
            this.route.navigate(['/login'])
        }
    }

    getCategories() {
        var formData = new FormData();
        formData.append('restaurant_id', this.restaurantId);
        formData.append('userId', this.userId);
        this.UserService.getCategoriesList(formData)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                    this.categories = result['result']['categories'];
                    const categoryIds = <FormArray>this.orderListFilterForm.controls.categoryId;
                    for (let i = categoryIds.length - 1; i >= 0; i--) {
                        categoryIds.removeAt(i)
                    }
                    const categoryIdsTemp = <FormArray>this.orderListFilterForm.controls.categoryIdTemp;
                    var count = 0;
                    for (var val of this.categories) {
                        if(val.default == true ){
                            // this.checkCategAllFilter = false;
                            this.defaultChecked.push(val.id);
                            // this.defaultChecked = true;
                            count++;
                            // categoryIds.push(new FormControl(val.id));
                            this.oncheckedCheckbox(val.id,true);
                        }
                        else{
                            categoryIdsTemp.push(new FormControl(val.id));
                        }
                    }
                    if(count <= 0){
                        categoryIds.push(categoryIdsTemp);
                        this.getOderListing()
                    }
                    else{

                        this.orderListFilter();
                    }
                }
            }, (error) => {
            });
    }

    getOderListing() {
        var formData = new FormData();
        formData.append('userId', this.userId);
        formData.append('restaurantId', this.restaurantId);
        this.UserService.getOrderList(formData)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                    this.orders = result['result']['orders'];
                }
            }, (error) => {
            });
    }

    orderListFilter(condt = null) {
        this.UserService.getFilterOrders(this.orderListFilterForm.value)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                    this.orders = result['result']['orders'];
                }
            }, (error) => {
            });
    }

    oncheckedCheckbox(catId, isChecked, type = null) {
        if (type != null) {
            const orderType = <FormArray>this.orderListFilterForm.controls.type;
            if (isChecked) {
                orderType.push(new FormControl(catId));
            } else {
                let index = orderType.controls.findIndex(x => x.value == catId)
                orderType.removeAt(index);
            }
        } else {
            const categoryIds = <FormArray>this.orderListFilterForm.controls.categoryId;
            if (isChecked) {
                categoryIds.push(new FormControl(catId));
            } else {
                let index = categoryIds.controls.findIndex(x => x.value == catId)
                categoryIds.removeAt(index);
            }
        }
    }

    oncheckedSelectAll(e) {
        let chkValue = e.target.value;
        if (e.target.checked) {
            $('.selectCheck-' + chkValue).prop('checked', true);
        } else {
            $('.selectCheck-' + chkValue).prop('checked', false);
        }
    }

    itemOrderClicked(item_id, product_id, order_id, cookStatus, cookId,sideDishesStatus) {
        if (cookId == '' || cookId == null || cookId == this.userId) {

            var formData = new FormData();
            if (cookStatus != 1) {
                formData.append('cookStatus', "1");
                formData.append('cookId', this.userId);
            } else {
                formData.append('cookStatus', "0");
                formData.append('cookId', "");
            }
            formData.append('itemId', item_id);
            formData.append('productId', product_id);
            formData.append('orderId', order_id);
            formData.append('sideDishesStatus', sideDishesStatus);
            this.UserService.updateItemStatus(formData)
                .subscribe(result => {
                    if (result['status'] == 'Success') {
                    }
                }, (error) => {
                });
        } else {
        }

    }

    addZero(x, n) {
        while (x.toString().length < n) {
            x = "0" + x;
        }
        return x;
    }

 dateFromISO8601(isoDateString) {
  var parts = isoDateString.match(/\d+/g);
  return parts
  var isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);

  
  var isoDate = new Date(isoTime)

  return isoTime;
}
    calculateOrderWaitingTime(orderDate) {
		   var now = moment(); //todays date
var end = moment(orderDate); // another date
var duration = moment.duration(now.diff(end));
var days = duration.asDays();
	
	var h = this.addZero(duration.get("hours"), 2);
        var m = this.addZero(duration.get("minutes"), 2);
        var s = this.addZero(duration.get("seconds"), 2);
        let finalWaitingTime = '';
        if (h != '00') {
            finalWaitingTime = h + 'h:' + m + 'm:' + s + 's';
        } else {
            finalWaitingTime = m + 'm:' + s + 's';
        }
        return finalWaitingTime; 
	
	
	
	
        /* let today = new Date();
        let newOrderDate = new Date(orderDate);
		
		return today+'   '+newOrderDate+' '+moment(orderDate).format();
		
        let milliseconds = today.getTime() - newOrderDate.getTime();
        let diffMs = (today.valueOf() - newOrderDate.valueOf()); // milliseconds
        let newdate = new Date(milliseconds).toISOString()

        var d = new Date(newdate);
        var h = this.addZero(d.getUTCHours(), 2);
        var m = this.addZero(d.getUTCMinutes(), 2);
        var s = this.addZero(d.getUTCSeconds(), 2);
        let finalWaitingTime = '';
        if (h != '00') {
            finalWaitingTime = h + 'h:' + m + 'm:' + s + 's';
        } else {
            finalWaitingTime = m + 'm:' + s + 's';
        }
        return finalWaitingTime; */
    }

    getOrderComments(orderId, ticketId) {
        var formData = new FormData();
        formData.append('orderId', orderId);

        this.UserService.getOrderComments(formData)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                    this.orderComments = result['result']['ordersComment'];
                }
            }, (error) => {
            });


        this.orderCommentId = orderId;
        this.ticketId = ticketId;
    }

    selectAllItems(orderId,type) {
        if(type == 'selectAll'){
            $('#selectAllItemsCheck1-' + orderId).addClass('chk-select');
            // $('.customServiceBox-' + orderId + ' .orderList .dish-order-count').trigger('click');
            $('#selectAllItemsCheck2-' + orderId).removeClass('chk-select');
            $('.customServiceBox-' + orderId + ' .orderList .selectAllFunct').trigger('click');

        }
        else{
            $('#selectAllItemsCheck2-' + orderId).addClass('chk-select');
            $('#selectAllItemsCheck1-' + orderId).removeClass('chk-select');
            $('.customServiceBox-' + orderId + ' .orderList .unselectAllFunct').trigger('click');

        }

        /*if ($('#selectAllItemsCheck-' + orderId).hasClass('chk-select')) {
            $('#selectAllItemsCheck-' + orderId).removeClass('chk-select');
        } else {
            $('#selectAllItemsCheck-' + orderId).addClass('chk-select');
            $('.customServiceBox-' + orderId + ' .orderList .dish-order-count').trigger('click');
        }*/

    }

    changeCheckCategAllFilter(type) {
        this.defaultChecked = [];
        var categoryIds = <FormArray>this.orderListFilterForm.controls.categoryId;
        for (let i = categoryIds.length - 1; i >= 0; i--) {
            categoryIds.removeAt(i)
        }
        var orderType = <FormArray>this.orderListFilterForm.controls.type;
        for (let j = orderType.length - 1; j >= 0; j--) {
            orderType.removeAt(j)
        }
        if (type == 0) {
            this.checkCategAllFilter = false;

        } else {
            this.checkCategAllFilter = true;
            for (var val of this.categories) {
                categoryIds.push(new FormControl(val.id));
            }
            for (let k = 0; k <= 2; k++) {
                orderType.push(new FormControl(k));
            }
        }
        this.orderListFilter();
    }

    sendServeStatus(orderId, type = null,sideDishesStatus = null) {
        var itemIdArr = Array();
        if (type == null) {
            var listLi = $('.customServiceBox-' + orderId + ' .orderList.selected');
            var listLisideDishesStatus = $('.customServiceBox-' + orderId + ' .orderList.selected .dish-order-count');
            for (let i = 0; i < listLi.length; i++) {
				if(listLisideDishesStatus[i].id)
                itemIdArr.push(listLi[i].id,listLisideDishesStatus[i].id);
            }
        } else {
			if(orderId)
             itemIdArr.push(orderId, sideDishesStatus);
        }
        var formData = new FormData();
        formData.append('itemId', JSON.stringify(itemIdArr));
        formData.append('serveStatus', '1');
          this.UserService.updateItemServeStatus(formData)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                }
            }, (error) => {
            });  
    }

    deleteOrder(orderId) {
        var formData = new FormData();
        formData.append('id', orderId);
        this.UserService.deleteOrder(formData)
            .subscribe(result => {
                if (result['status'] == 'Success') {
                }
            }, (error) => {
            });
    }


    getBackgroundColor(cnt) {
        if (cnt > 3) {
            var modu = cnt % 4;
            return this.bg[modu];
        } else {
            return this.bg[cnt];
        }
    }

    printReceipt(orderID: null) {
        if(this.userData.printer && this.userData.printer != null) {
            this.userData = JSON.parse(localStorage.getItem('userData'))
            this.UserService.getOrderForPrint(orderID)
                .subscribe(result => {
                    if (result['status'] == 'Success') {
                        this.printOrder = result['result'];
                        var order = Array
                        var sequence = 0
                        if (epson) {
                            var builder = new epson.ePOSBuilder();
                            builder.addTextLang('fr').addTextSmooth(true);
                            // header
                            builder.addTextAlign(builder.ALIGN_CENTER);
                            builder.addTextAlign(builder.ALIGN_CENTER).addText(this.printOrder['order']['restaurant']['name'] + '\n');
                            builder.addTextAlign(builder.ALIGN_LEFT).addText('Ticket :' + this.printOrder['order']['orderId']);
                            builder.addTextPosition(320).addText(this.printOrder['order']['orderPlacedDate'] + '\n');
                            if (this.printOrder['order']['orderTableId'] != null) {
                                builder.addTextAlign(builder.ALIGN_LEFT).addText('Table #' + this.printOrder['order']['orderTableName']);
                                builder.addTextPosition(320).addText('Couverts: ' + this.printOrder['order']['noOfPersons'] + '\n');
                            } else {
                                builder.addTextAlign(builder.ALIGN_LEFT).addText('A emporter' + '\n');
                            }


                            builder.addTextAlign(builder.ALIGN_LEFT);
                            builder.addFeedUnit(12);

                            // items
                            order = this.printOrder['order']['items'];
                            var l_total = 0;
                            var r_total = 0;
                            for (var i = 0; i < order.length; i++) {
                                builder.addText(order[i].count + ' X ' + order[i].name).addTextPosition(400).addText('\n');
                                if (order[i].cookingType != '')
                                    builder.addTextSize(2, 1).addTextPosition(80).addText(order[i].cookingType).addTextPosition(400).addText('' + '\n');
                                builder.addTextSize(1, 1);
                                if (order[i].foodType != '')
                                    builder.addTextPosition(80).addText(order[i].foodType).addTextPosition(400).addText('' + '\n');
                                if (order[i].sideDishes.length > 0) {
                                    for (var j = 0; j < order[i].sideDishes.length; j++) {
                                        builder.addTextPosition(80).addText(order[i].sideDishes[j].name).addTextPosition(400).addText('' + '\n');
                                    }
                                }

                            }
                            l_total += Math.floor(r_total / 100);
                            r_total = (r_total % 100);
                            builder.addText('\n');

                            builder.addFeedUnit(24);
                            builder.addCut(builder.CUT_FEED);

                            // send to printer
                            var epos = new epson.ePOSPrint();
                            var domain = this.userData.printer.ip;
                            var receipt = this.userData.printer.device_id;
                            epos.address = 'http://' + domain + '/cgi-bin/epos/service.cgi?devid=' + receipt + '&timeout=10000';
                            epos.onreceive = function (res) {
                                if (!res.success) {
                                    return;
                                }
                            }
                            epos.onerror = function (err) {
                            }
                            epos.send(builder.toString());
                            sequence++;
                        }
                    }
                }, (error) => {
                });
        }
    }

    toPrice8(val) {
        return ('       $' + val).slice(-8);
    }


}
