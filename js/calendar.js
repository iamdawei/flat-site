var Calendar = function () {
    return {
        //main function to initiate the module
        init: function () {

            Calendar.initCalendar();
        },

        initCalendar: function () {

            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            
			 if ($('#calendar').parents(".portlet").width() <= 720) {
				$('#calendar').addClass("mobile");
				h = {
					left: 'title, prev, next',
					center: '',
					right: 'today,month,agendaWeek,agendaDay'
				};
			} else {
				$('#calendar').removeClass("mobile");
				h = {
					left: 'title',
					center: '',
					right: 'prev,next,today,month,agendaWeek,agendaDay'
				};
			}
            
           

            var initDrag = function (el) {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });
            }

            var addEvent = function (title) {
                title = title.length == 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            }

            $('#external-events div.external-event').each(function () {
                initDrag($(this))
            });

            $('#event_add').unbind('click').click(function () {
                var title = $('#event_title').val();
                addEvent(title);
            });

            //predefined events
            $('#event_box').html("");
            addEvent("自定义事件");
            addEvent("移动一下试试看吧");
            addEvent("提醒");

            $('#calendar').fullCalendar('destroy'); // destroy the calendar
            $('#calendar').fullCalendar({ //re-initialize the calendar
                header: h,
                slotMinutes: 15,
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function (date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
				buttonText: {
					today: '今天',
					month: '月',
					week: '周',
					day: '日'
				},
				allDayText: "全天",
				timeFormat: {
					'': 'H:mm{-H:mm}'
				},
				weekMode: "variable",
				columnFormat: {
					month: 'dddd',
					week: 'dddd M-d',
					day: 'dddd M-d'
				},
				titleFormat: {
					month: 'yyyy年 MMMM月',
					week: "[yyyy年] MMMM月d日 { '&#8212;' [yyyy年] MMMM月d日}",
					day: 'yyyy年 MMMM月d日 dddd'
				},
				monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
				dayNames: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    
                events: [{
                        title: 'All Day Event',                        
                        start: new Date(y, m, 1),
                    }, {
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end: new Date(y, m, d - 2),
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        allDay: false,
                    }, {
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        allDay: false,
                    }, {
                        title: 'Meeting',
                        start: new Date(y, m, d, 10, 30),
                        allDay: false,
                    }, {
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false,
                    }, {
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end: new Date(y, m, d + 1, 22, 30),
                        allDay: false,
                    }, {
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/',
                    }
                ]
            });

        }

    };

}();