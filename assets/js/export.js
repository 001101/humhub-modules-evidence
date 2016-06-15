$(document).ready(function() {
    $(".buttonSaveExport").on("click", function() {
        if($(".activityObjects").length == 0) {
            $("#selectContributions").modal('show');
            return false;
        }

        var url = $("#formSaveExport").attr('action');
        var data = $("#formSaveExport").serialize();
        var obj_data = $(".listOfItems").serialize();
        var requestData = {'exportData': data, 'html':$(".contentListOfItems").html(), "obj_data" : obj_data};
        $.ajax({
            url: url,
            data: requestData,
            type: 'POST',
            success: function(data) {
                var response = JSON.parse(data);
                if(response.flag) {
                    window.location.href = response.redirect;
                } else {
                    $("#formSaveExport .displayErrors").empty();
                    $("#formSaveExport .displayErrors").append("<p>"+response.error.name+"</p>");
                }
            }
        });

        return false;
    });

    $(".loadExport").on("click", function() {
        var exportId = $(".loadExportSelect").val();
        var url = $(this).data('url');
        $.ajax({
            url: url,
            data: {'exportId': exportId, "CSRF": "b1b12323333qweqw"},
            type: 'POST',
            success: function(data) {
                var response = JSON.parse(data);
                if(response.flag) {
                    console.log(response.redirect);
                    window.location.href = response.redirect;
                } else {
                    $("#exportLoad .displayErrors").empty();
                    $("#exportLoad .displayErrors").append("<p>"+response.error.name+"</p>");
                }
            }
        });
    });

    $(".context-part .context-select").on("change", function() {
        prepareData($(this));
    });

    $(".context-part .context-checkbox").on("change", function() {
        prepareData($(this));
    });

    $(".context-part .context-textarea").on("change", function() {
        prepareData($(this));
    });

    function prepareData(contextObject) {
        var type = contextObject.data("type");
        var data = contextObject.val();
        var dataId = contextObject.data("id");
        var parentType = contextObject.parents(".context-part").data("type");
        if(type == "checkbox" || type == "checkbox_question") {
            prepareCheckbox(data, type, parentType, dataId);
        } else if(type == "select") {
            prepareSelect(data, type, parentType, dataId);
        } else if(type == "textarea") {
            prepareTextarea(data, type, parentType);
        }
    }

    function prepareCheckbox(data, type, parentType, dataId) {
        var objectActivity = $("input[name='activityItems["+parentType+"]["+type+"][]'][data-id='"+dataId+"'][data-type='"+type+"']");
        var input = '<input class="activityObjects" name="activityItems['+parentType+']['+type+'][]" value="' + dataId + '" data-name="'+parentType+'" type="hidden" data-type="'+type+'" data-id="' + dataId + '">';
        if(objectActivity.length == 0) {
            $(".contentListOfItems").append(input);
        } else {
            objectActivity.remove();
        }
    }

    function prepareSelect(data, type, parentType) {
        var dataId = 0;
        var objectActivity = $("input[name='activityItems["+parentType+"][select]'][data-type='"+type+"']");
        var input = '<input class="activityObjects" name="activityItems['+parentType+'][select]" value="' + data + '" data-name="'+parentType+'" type="hidden" data-type="'+type+'" data-id="' + data + '">';
        if(objectActivity.length == 0) {
            $(".contentListOfItems").append(input);
        } else {
            objectActivity.remove();
            $(".contentListOfItems").append(input);
        }
    }

    function prepareTextarea(data, type, parentType) {
        var dataId = 0;
        var objectActivity = $("input[name='activityItems["+parentType+"][textarea]'][data-id='"+dataId+"'][data-type='"+type+"']");
        var input = '<input class="activityObjects" name="activityItems['+parentType+'][textarea]" value="' + data + '" data-name="'+parentType+'" type="hidden" data-type="'+type+'" data-id="' + dataId + '">';
        if(objectActivity.length == 0) {
            $(".contentListOfItems").append(input);
        } else {
            objectActivity.val(data);
        }
    }

    $("body").on("click", ".second-context", function() { // redirect to second step
        if($(".activityObjects").length == 0) {
            $("#selectContributions").modal('show');
            return false;
        }

        var url = $(this).data('url');
        var data = $("#formSaveExport").serialize();
        var requestData = {'exportData': data, 'html':$(".contentListOfItems").html()};
        $.ajax({
            url: url,
            data: requestData,
            type: 'POST',
            success: function(data) {
                console.log(data);
            }
        });

        $(".listOfItems").submit();
        return true;
    });

    if($(".context-part").length && $(".activityObjects").length) {
        $.each($(".activityObjects"), function (index) {

            var currentType = $(this).data('type');
            var dataId = $(this).data('id');
            var dataName = $(this).data('name');
            var dataValue = $(this).val();

            if(currentType == "checkbox" || currentType == "checkbox_question") {
                var objectActivity = $(".context-part[data-type='"+dataName+"'] .itemSelect[data-type='"+currentType+"']");
                if (!objectActivity.is(":checked")) {
                    objectActivity.prop("checked", true);
                }
            }

            if(currentType == "select") {
                var objectActivity = $(".context-part[data-type='"+dataName+"'] .context-select[data-type='"+currentType+"']");
                if (objectActivity.length) {
                    setTimeout(function(){
                        $(".context-part[data-type='"+dataName+"']  select:first option[value='"+dataId+"']").prop('selected', true);
                        $(".context-part[data-type='"+dataName+"'] .selectpicker").selectpicker('refresh');
                    }, 700);
                }
            }

            if(currentType == "textarea") {
                var objectActivity = $(".context-part[data-type='"+dataName+"'] .context-textarea[data-type='"+currentType+"']");
                if (objectActivity.length) {
                    objectActivity.val(dataValue);
                }
            }
        });
    }
    $(".btn-export").on("click", function() {
        var table = $("table.items").clone();
        table.find("td").attr("style", "font-size:14px");
        table.find("th").attr("style", "font-size:14px");
        var html = table[0].outerHTML;
        $.ajax({
            url: tableSaveExport,
            data: {'table': html},
            type: 'POST',
            success: function(data) {
                var result = JSON.parse(data);
                if(result.flag == 1) {
                    window.location.href = result.path;
                }
            }
        });
        return false;
    });
});