function clickCreateNode() {
    let n = createNode(canvas);
    nodes.push(n);
    canvas.setActiveObject(n.group);
}

function clickCenterZoom() {
    canvas.viewportTransform[4] = 0;
    canvas.viewportTransform[5] = 0;
    canvas.setZoom(1);
    canvas.requestRenderAll();
}

function clickZoomIn() {
    zoom(0.25);
}

function clickZoomOut() {
    zoom(-0.25);
}

function zoom(delta) {
    var zoom = canvas.getZoom();
    zoom = zoom + (zoom * delta);
    if (zoom > 5) zoom = 5;
    if (zoom < 0.25) zoom = 0.25;
    pos = canvas.getVpCenter();
    canvas.zoomToPoint({ x: pos.x, y: pos.y }, zoom);
    console.log(zoom)
}

function createNode(canvas) {
    let obj = {};

    obj.children = [];
    obj.colour = 'gray';

    obj.bg = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width: 150,
        height: 80,
        fill: 'rgba(255,255,255,1)',
        transparentCorners: false,
    });
    obj.rect = new fabric.Rect({
        originX: 'center',
        originY: 'center',
        width: 150,
        height: 80,
        fill: 'rgba(0,0,0,0.1)',
        transparentCorners: false,
        strokeWidth: 2,
        stroke: "rgba(0,0,0,0.5)",
    });
    obj.title = new fabric.Text('Title', {
        top: -30,
        left: 0,
        fontSize: 22,
        originX: 'center',
        fontFamily: 'Segoe UI'
    });
    obj.desc = new fabric.Text('Description', {
        top: 5,
        left: 0,
        fontSize: 18,
        originX: 'center',
        fontFamily: 'Segoe UI'
    });
    obj.group = new fabric.Group([ obj.bg, obj.rect, obj.title, obj.desc], {
        left: 0,
        top: 0,
        angle: 0,
        hasRotatingPoint: false,
        hasControls: false,
        subTargetCheck: true
    });

    //
    obj.updateNodeDraw = function () {
        let tw = obj.title.getScaledWidth();
        let dw = obj.desc.getScaledWidth();

        newWidth = Math.max(tw,dw)+50;
        obj.rect.width = newWidth;
        obj.bg.width = newWidth;
        obj.group.width = newWidth;
        canvas.renderAll();
    };
    
    // Show and fill in the form with values on selection
    obj.group.on('selected', function(){
        $('#on-select').css("display", "block");
        $('#title').val(obj.title.text);
        $('#description').val(obj.desc.text);
        console.log(obj.rect.fill)
        $('#colour').val(obj.colour);
    });

    // Show shape on canvas
    canvas.add(obj.group);
    obj.updateNodeDraw();

    // Center it 
    canvas.viewportCenterObject(obj.group);

    return obj;
}

function createLink(canvas) {

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
            obj.colour = $("#colour").val();
            obj.title.set('text', $("#title").val());
            obj.desc.set('text', $("#description").val());
            obj.rect.set('fill', colours[obj.colour]);
            obj.updateNodeDraw();
        }
    });
}

// init
const colours = {
    'gray': 'rgba(0,0,0,0.1)',
    'red': 'rgba(255,0,0,0.25)',
    'green': 'rgba(0,255,0,0.25)',
    'blue': 'rgba(0,0,255,0.25)',
    'yellow': 'rgba(255,255,0,0.25)',
    'purple': 'rgba(190,0,255,0.25)',
    'cyan': 'rgba(0,255,255,0.25)',
};
var nodes = [];

// Create canvas
var canvas = this.__canvas = new fabric.Canvas('c');
canvas.setBackgroundColor({
    source: './grid.png',
    repeat: 'repeat'
}, canvas.renderAll.bind(canvas));

canvas.selection = false;
windowWidth = $(window).width();
windowHeight= $(window).height();
canvas.setDimensions({width:windowWidth, height:windowHeight});
clickCreateNode();
canvas.requestRenderAll();


// Add mobile check
window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// Add event listeners/form input
$("#title").on('keyup', function (e) {
    onInputText();
});
$("#description").on('keyup', function (e) {
    onInputText();
});
$("#colour").change(function(){
    onInputText();
});

// Remove editing panel on deselection
canvas.on('selection:cleared', function(options) {
    $('#on-select').css("display", "none");
});

console.log(window.mobileAndTabletcheck())
canvas.on('mouse:down', function(opt) {
    // Close the edit panel if it isn't already
    closeNav();

    // Check for touch or mouse (touches have different structure)
    // Change this to directly detect touch vs mouse later (instead of device type)
    if (window.mobileAndTabletcheck()) {
        var evt = opt.e.touches[0];
    }
    else {
        var evt = opt.e;
    }
    this.isDragging = true;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
});
canvas.on('mouse:move', function(opt) {
    if (this.isDragging) {
        if (this.getActiveObjects().length == 0) {
            if (window.mobileAndTabletcheck()) {
                var evt = opt.e.touches[0];
            }
            else {
                var evt = opt.e;
            }
            this.viewportTransform[4] += evt.clientX - this.lastPosX;
            this.viewportTransform[5] += evt.clientY - this.lastPosY;
            this.requestRenderAll();
            this.lastPosX = evt.clientX;
            this.lastPosY = evt.clientY;
        }
    }
});
canvas.on('mouse:up', function(opt) {
    // Stop dragging
    this.isDragging = false;

    // SetCoords so objects update their selection boxes
    nodes.forEach(function(item){
        item.group.setCoords();
    });
});

// Update canvas to be window width
$(window).resize(function(){
    windowWidth = $(window).width();
    windowHeight= $(window).height();
    canvas.setDimensions({width:windowWidth, height:windowHeight});
});

// Nav
function openNav() {
    document.getElementsByClassName("sidebar")[0].style.width = "300px";
}

function closeNav() {
    document.getElementsByClassName("sidebar")[0].style.width = "0";
}


// test
const socket = new WebSocket('ws://localhost:5000');
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});