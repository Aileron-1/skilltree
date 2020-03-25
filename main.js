function clickCreateNode() {
    nodes.push(createNode(canvas));
}

function clickCenterZoom() {
    canvas.viewportTransform[4] = 0;
    canvas.viewportTransform[5] = 0;
    canvas.requestRenderAll();
}

function createNode(canvas) {
    let obj = {};

    obj.rect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width: 150,
        height: 80,
        fill: 'rgba(0,0,0,0.1)',
        transparentCorners: false
    });
    obj.title = new fabric.Text('Node title', {
        top: -30,
        left: 0,
        fontSize: 22,
        originX: 'center',
        fontFamily: 'Segoe UI'
    });
    obj.desc = new fabric.Text('Node description', {
        top: 5,
        left: 0,
        fontSize: 18,
        originX: 'center',
        fontFamily: 'Segoe UI'
    });
    obj.group = new fabric.Group([ obj.rect, obj.title, obj.desc ], {
        left: 0,
        top: 0,
        angle: 0,
        hasRotatingPoint: false,
        hasControls: false
    });

    //
    obj.updateNodeDraw = function () {
        let tw = obj.title.getScaledWidth();
        let dw = obj.desc.getScaledWidth();

        newWidth = Math.max(tw,dw)+20;
        obj.rect.width = newWidth;
        obj.group.width = newWidth;
        canvas.renderAll();
    };
    
    // Show and fill in the form with values on selection
    obj.group.on('selected', function(){
        $('#on-select').css("display", "flex");
        $('#title').val(obj.title.text);
        $('#description').val(obj.desc.text);
    });

    // Show shape on canvas
    canvas.add(obj.group);

    // Center it 
    canvas.viewportCenterObject(obj.group);

    return obj;
}

function onInputText() {
    // Update the Currently selected node's text
    active = canvas.getActiveObject();
    if (active == undefined) {
        return;
    }
    nodes.forEach(function (item, index) {
        if (item.group == active) {
            obj = item;
            obj.title.set('text', $("#title").val());
            obj.desc.set('text', $("#description").val());
            obj.updateNodeDraw();
        }
    });
}

var canvas = this.__canvas = new fabric.Canvas('c');
canvas.setBackgroundColor('rgba(0,0,255,0.05)')
canvas.selection = false;


windowWidth = $(window).width();
canvas.setDimensions({width:windowWidth, height:600});

var colours = {
    'gray': 'rgba(0,0,0,0.1)',
    'red': 'rgba(255,0,0,0.25)',
    'green': 'rgba(0,255,0,0.25)',
    'blue': 'rgba(0,0,255,0.25)',
};
var nodes = [];

// Add event listeners/form input
$("#title").on('keyup', function (e) {
    onInputText();
});
$("#description").on('keyup', function (e) {
    onInputText();
});

// Remove editing panel on deselection
canvas.on('selection:cleared', function(options) {
    $('#on-select').css("display", "none");
});

canvas.on('mouse:down', function(opt) {
    var evt = opt.e;
    this.isDragging = true;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
});
canvas.on('mouse:move', function(opt) {
    if (this.isDragging) {
        if (this.getActiveObjects().length == 0) {
            var e = opt.e;
            this.viewportTransform[4] += e.clientX - this.lastPosX;
            this.viewportTransform[5] += e.clientY - this.lastPosY;
            this.requestRenderAll();
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }
    }
});
canvas.on('mouse:up', function(opt) {
    this.isDragging = false;

    // SetCoords so objects update their selection boxes
    nodes.forEach(function(item){
        item.group.setCoords();
    });
});
    