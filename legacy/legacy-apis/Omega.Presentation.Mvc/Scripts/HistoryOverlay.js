
var historyOverlay = {
    data: null,
    activeIndex: null,
    activeConditionIndex: null,
    activeDescriptionIndex: null,
    activeConditions: null,
    activeDescriptions: null,
    init: function () {
        var data = document.getElementById('configValueInput').value;
        if (data.length > 0) {
            historyOverlay.data = JSON.parse(unescape(document.getElementById('configValueInput').value));
            if (historyOverlay.data == null) historyOverlay.data = [];
        } else {
            historyOverlay.data = [];
        }

        historyOverlay.buildTable();
    },
    buildTable: function () {
        var header = '<tr>' +
            '<th>Priority</th>' +
            '<th>Conditions</th>' +
            '<th>New Description</th>' +
            '<th><button class="btn btn-sm btn-success" onclick="historyOverlay.loadRule(-1);"><span class="glyphicon glyphicon-plus"></span></button></th>' +
            '</tr>';

        var body = '';

        var data = historyOverlay.data;
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var conditions = '';
            var descriptions = '';

            if (d.Conditions != null) {
                for (var j = 0; j < d.Conditions.length; j++) {
                    var x = d.Conditions[j];
                    conditions += historyOverlay.buildConditionSummaryHtml(x);
                }
            }

            if (d.Descriptions != null) {
                for (var j = 0; j < d.Descriptions.length; j++) {
                    var x = d.Descriptions[j];
                    descriptions += historyOverlay.buildDescriptionSummaryHtml(x);
                }
            }

            var row = '<tr>' +
                '<td>' + d.Priority + '</td>' +
                '<td>' + conditions + '</td>' +
                '<td>' + descriptions + '</td>' +
                '<td><button class="btn btn-sm btn-info" onclick="historyOverlay.loadRule(' + i + ');"><span class="glyphicon glyphicon-edit"></span></button></td>' +
                '</tr>';
            body += row;
        }

        $('#HistoryOverlayTable').html(header + body);
    },
    loadRule: function (id) {
        var data = null;
        if (id == -1) data = {};
        else data = historyOverlay.data[id];


        historyOverlay.activeConditions = data.Conditions;
        historyOverlay.activeDescriptions = data.Descriptions;
        historyOverlay.activeIndex = id;

        $('#history-overlay-priority').val(data.Priority);
        $('#history-overlay-conditions-table').html(historyOverlay.buildConditionTableRowsHtml(data.Conditions));
        $('#history-overlay-descriptions-table').html(historyOverlay.buildDescriptionTableRowsHtml(data.Descriptions));

        $('#history-overlay-modal').modal();
    },
    UpdateRule: function () {
        var index = historyOverlay.activeIndex;
        if (index == -1) {
            index = historyOverlay.data.length;
            historyOverlay.data.push({});
            historyOverlay.activeIndex = index;
        }

        var data = historyOverlay.data[index];
        data.Priority = $('#history-overlay-priority').val();
        data.Conditions = historyOverlay.activeConditions;
        data.Descriptions = historyOverlay.activeDescriptions;

        if (data.Priority == "" || data.Priority == null) data.Priority = -1;

        historyOverlay.buildTable();
    },
    RemoveRule: function () {
        if (!confirm("Are you sure you want to delete this rule?")) return;
        var index = historyOverlay.activeIndex;
        if (index == -1) {
            $('#history-overlay-modal').modal('hide');
            return;
        }

        var data = historyOverlay.data;
        var newData = [];

        for (var i = 0; i < data.length; i++) {
            if (i == index) continue;
            newData.push(data[i]);
        }
        historyOverlay.data = newData;
        historyOverlay.data.sort(function (a, b) { return a.Priority - b.Priority });
        historyOverlay.buildTable();

        $('#history-overlay-modal').modal('hide');
    },
    buildDescriptionTableRowsHtml: function (d) {
        var rows = '<tr>' +
            '<th>Descritpion</th>' +
            '<th>Value</th>' +
            '<th><button class="btn btn-xs btn-success" onclick="historyOverlay.LoadDescription(-1);"><span class="glyphicon glyphicon-plus"></span></button></th>' +
            '</tr>';

        if (d == null) return rows;

        for (var i = 0; i < d.length; i++) {
            rows += '<tr>' +
                '<td>' + d[i].DescriptionType + '</td>' +
                '<td>' + d[i].Value + '</td>' +
                '<td><button class="btn btn-xs btn-info" onclick="historyOverlay.LoadDescription(' + i + ');"><span class="glyphicon glyphicon-edit"></span></button></td>' +
                '</tr>';
        }
        return rows;
    },
    buildConditionTableRowsHtml: function (d) {
        var rows = '<tr>' +
            '<th>Condition</th>' +
            '<th>Value</th>' +
            '<th><button class="btn btn-xs btn-success" onclick="historyOverlay.LoadCondition(-1);"><span class="glyphicon glyphicon-plus"></span></button></th>' +
            '</tr>';

        if (d == null) return rows;

        for (var i = 0; i < d.length; i++) {
            rows += '<tr>' +
                '<td>' + d[i].Pivot + '</td>' +
                '<td>' + d[i].Value + '</td>' +
                '<td><button class="btn btn-xs btn-info" onclick="historyOverlay.LoadCondition(' + i + ');"><span class="glyphicon glyphicon-edit"></span></button></td>' +
                '</tr>';
        }

        return rows;
    },
    buildDescriptionSummaryHtml: function (d) {
        if (d.DescriptionField == "DescriptionField2") {
            if (d.DescriptionType == "Description1" || d.DescriptionType == "Description2")
                return "Field 2: " + d.DescriptionType + "<br/>";
            return "Field 2: " + d.DescriptionType + ' is ' + d.Value + '<br/>';
        }

        if (d.DescriptionType == "Description1" || d.DescriptionType == "Description2")
            return "Field 1: " + d.DescriptionType + "<br/>";
        return "Field 1: " + d.DescriptionType + ' is ' + d.Value + '<br/>';

    },
    buildConditionSummaryHtml: function (d) {
        return d.Pivot + ' is ' + d.Value +
            '<br/>';
    },
    LoadCondition: function (index) {
        if (historyOverlay.activeIndex == -1) {
            alert('You must first save the rule before you can add conditions.');
            return;
        }
        historyOverlay.activeConditionIndex = index;

        var data = {};
        if (index != -1) {
            for (var i = 0; i < historyOverlay.data.length; i++) {
                if (i != historyOverlay.activeIndex) continue;

                for (var j = 0; j < historyOverlay.data[i].Conditions.length; j++) {
                    if (j != historyOverlay.activeConditionIndex) continue;
                    data = historyOverlay.data[i].Conditions[j];
                    break;
                }
            }
        }

        $('#history-overlay-condition-pivot').val(data.Pivot);
        $('#history-overlay-condition-value').val(data.Value);
        $('#history-overlay-condition-modal').modal();
    },
    UpdateCondition: function () {
        var data = {
            Pivot: $('#history-overlay-condition-pivot').val(),
            Value: $('#history-overlay-condition-value').val()
        };
        var index = historyOverlay.activeConditionIndex;

        for (var i = 0; i < historyOverlay.data.length; i++) {
            if (i != historyOverlay.activeIndex) continue;


            if (index == -1) {
                if (historyOverlay.data[i].Conditions == null) historyOverlay.data[i].Conditions = [];
                historyOverlay.data[i].Conditions.push(data);
                break;
            }

            for (var j = 0; j < historyOverlay.data[i].Conditions.length; j++) {
                if (j != historyOverlay.activeConditionIndex) continue;
                historyOverlay.data[i].Conditions[j] = data;
                break;
            }
        }

        $('#history-overlay-condition-modal').modal('hide');
        historyOverlay.loadRule(historyOverlay.activeIndex);
    },
    RemoveCondition: function () {
        if (!confirm("Are you sure you want to delete this condition?")) return;

        if (historyOverlay.activeConditionIndex == -1 || historyOverlay.activeIndex == -1) {
            $('#history-overlay-condition-modal').modal('hide');
            return;
        }
        var data = historyOverlay.data;

        for (var i = 0; i < data.length; i++) {
            if (i != historyOverlay.activeIndex) continue;

            var newData = [];

            for (var j = 0; j < data[i].Conditions.length; j++) {
                if (j == historyOverlay.activeConditionIndex) continue;
                newData.push(data[i].Conditions[j]);
            }
            historyOverlay.data[i].Conditions = newData;
            break;
        }
        historyOverlay.buildTable();
        historyOverlay.loadRule(historyOverlay.activeIndex);

        $('#history-overlay-condition-modal').modal('hide');
    },
    LoadDescription: function (index) {
        if (historyOverlay.activeIndex == -1) {
            alert('You must first save the rule before you can add descriptions');
            return;
        }

        historyOverlay.activeDescriptionIndex = index;

        var data = {};
        if (index != -1) {
            for (var i = 0; i < historyOverlay.data.length; i++) {
                if (i != historyOverlay.activeIndex) continue;

                for (var j = 0; j < historyOverlay.data[i].Descriptions.length; j++) {
                    if (j != historyOverlay.activeDescriptionIndex) continue;
                    data = historyOverlay.data[i].Descriptions[j];
                    break;
                }
            }
        }

        if (data.DescriptionField == null || data.DescriptionField == undefined || data.DescriptionField == '')
            data.DescriptionField = 'DescriptionField1';

        $('#history-overlay-description-for').val(data.DescriptionField);
        $('#history-overlay-description-type').val(data.DescriptionType);
        $('#history-overlay-description-value').val(data.Value);
        $('#history-overlay-description-modal').modal();
    },
    UpdateDescription: function () {
        var data = {
            DescriptionType: $('#history-overlay-description-type').val(),
            Value: $('#history-overlay-description-value').val(),
            DescriptionField: $('#history-overlay-description-for').val()
        };

            if (data.DescriptionField == '') {
                data.DescriptionField = 'DescriptionField1';
            }
        var index = historyOverlay.activeDescriptionIndex;

        for (var i = 0; i < historyOverlay.data.length; i++) {
            if (i != historyOverlay.activeIndex) continue;

            if (index == -1) {

                if (historyOverlay.data[i].Descriptions == null) historyOverlay.data[i].Descriptions = [];
                historyOverlay.data[i].Descriptions.push(data);
                break;
            }


            for (var j = 0; j < historyOverlay.data[i].Descriptions.length; j++) {
                if (j != historyOverlay.activeDescriptionIndex) continue;
                historyOverlay.data[i].Descriptions[j] = data;
                break;
            }
        }

        $('#history-overlay-description-modal').modal('hide');
        historyOverlay.loadRule(historyOverlay.activeIndex);
    },
    RemoveDescription: function () {
        if (!confirm("Are you sure you want to delete this description?")) return;

        if (historyOverlay.activeDescriptionIndex == -1 || historyOverlay.activeIndex == -1) {
            $('#history-overlay-description-modal').modal('hide');
            return;
        }
        var data = historyOverlay.data;

        for (var i = 0; i < data.length; i++) {
            if (i != historyOverlay.activeIndex) continue;

            var newData = [];

            for (var j = 0; j < data[i].Descriptions.length; j++) {
                if (j == historyOverlay.activeDescriptionIndex) continue;
                newData.push(data[i].Descriptions[j]);
            }
            historyOverlay.data[i].Descriptions = newData;
            break;
        }
        historyOverlay.buildTable();
        historyOverlay.loadRule(historyOverlay.activeIndex);

        $('#history-overlay-description-modal').modal('hide');
    },
};