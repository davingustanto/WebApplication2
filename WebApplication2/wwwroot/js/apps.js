var user_temp = null, user_cred = null, file_multi_upload_list = [],
    localStorageAccount = localStorage.getItem('ls.authorizationData'), src_doc = null, id_doc = null, annotate_doc = [];

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function popUpAnimantion(focID, elID) {
    $.magnificPopup.open({
        items: {
            src: elID
        },
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        focus: focID,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });
}

function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

function generateGUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function newPopup(url, winName, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    settings =
        'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left=' + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    popupWindow = window.open(url, winName, settings)
}

function replaceHrefEmpty() {
    var a_elements = document.getElementsByTagName('a');
    for (var i = 0; i < a_elements.length; i++) {
        if (a_elements[i].href == this.location.href + '#') {
            a_elements[i].style.cursor = 'pointer';
            a_elements[i].removeAttribute('href');
        }
    }
}

function formatTime(date_time) {
    var date_temp = new Date(date_time);
    return (((date_temp.getHours() < 10) ? ('0' + date_temp.getHours()) : date_temp.getHours()) + ':' + ((date_temp.getMinutes() < 10) ? ('0' + date_temp.getMinutes()) : date_temp.getMinutes()));
}

var formatDateTime = function (dateInput) {
    var date = new Date(dateInput);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (date.getHours() < 10)
        hours = '0' + date.getHours();
    if (date.getMinutes() < 10)
        minutes = '0' + date.getMinutes();

    var formatted = date.getFullYear() + "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + " " + hours + ":" +
        minutes;
    return formatted;
};

function clearSelectionText() {
    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var formatCurrency = function (amount) {
    if (!amount)
        return "";
    amount += '';
    x = amount.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

var formatDate = function (dateInput) {
    var date = new Date(dateInput);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (date.getHours() < 10)
        hours = '0' + date.getHours();
    if (date.getMinutes() < 10)
        minutes = '0' + date.getMinutes();
    var formatted = date.getFullYear() + "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + " " + hours + ":" +
        minutes;

    var formattedDateOnly = ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2) + "/" + date.getFullYear();
    return formattedDateOnly;
};

function ajaxHelper(uri, method, data, header) {
    if (header == null) {
        var token = (localStorage.getItem('ls.authorizationData') != null) ? JSON.parse(localStorage.getItem('ls.authorizationData')).token : null;
        header = {};
        header.Authorization = 'Bearer ' + token;
    }
    return $.ajax({
        type: method,
        url: uri,
        processData: true,
        contentType: 'application/json; charset=utf-8',
        data: data ? JSON.stringify(data) : null,
        headers: header
    });
}

function getJson(url, params, headers) {
    if (headers == null) {
        var token = (localStorage.getItem('ls.authorizationData') != null) ? JSON.parse(localStorage.getItem('ls.authorizationData')).token : null;
        headers = {};
        headers.Authorization = 'Bearer ' + token;
    }

    var isValid = true;

    var data_ = $.ajax({
        async: false,
        global: false,
        url: url,
        headers: headers,
        data: params ? params : null,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'JSON',
        success: function (data) {
            return data;
        }, error: function (e) {
            isValid = false;
            return e;
        }
    });

    return (isValid ? data_.responseJSON : data_);
}

var response_error = function (resp) {
    var response_return = [];
    var encodedValue = '';
    var property = {};
    if (typeof resp != 'string') {
        if (resp.length > 0) {
            for (var item of resp) {
                for (property in item) {
                    encodedValue = (encodedValue != '' ? (encodedValue + ', ') : '') + (item[property]);
                }
                response_return.push(encodedValue);
            }
        } else {
            for (property in resp) {
                encodedValue = (resp[property]);
                response_return.push(encodedValue);
            }
        }
    } else
        response_return.push(resp);
    return response_return;
};

var build_element_error = function (resp) {
    var element_message = '';
    var error_list = response_error(resp);
    for (var i = 0; i < error_list.length; i++) {
        element_message = element_message + '<p style="font-style:italic; ' + (i < (error_list.length - 1) ? 'margin-bottom: 0 !important;' : '') + '">&bull;&nbsp;' + error_list[i] + '</p>';
    }
    return element_message;
};

var build_element_error_new = function (resp) {
    var element_message_new = '';
    var error_list = response_error(resp);
    for (var i = 0; i < resp.length; i++) {
        element_message_new = element_message_new + '<p style="font-style:italic; ' + (i < (error_list.length - 1) ? 'margin-bottom: 0 !important;' : '') + '">&bull;&nbsp;' + resp[i].message + '</p>';
    }
    return element_message_new;
};

var popup_error = function (resp) {
    var element_popup = '<div class="white-popup"><div class="card"><div class="card-header">Error</div><div class="card-body">' + build_element_error(resp) + '</div></div></div>';
    popUpAnimantion(null, element_popup);
};

var popup_error_index = function (resp) {
    var element_popup = '<div class="white-popup"><div class="card"><div class="card-header">Error</div><div class="card-body">' + build_element_error_new(resp) + '</div></div></div>';
    popUpAnimantion(null, element_popup);
};

var alert_error = function (resp) {
    $('#alert_popup_error').alert('close');
    var element_alert = '<div id="alert_popup_error" class="alert alert-danger alert-dismissible fade in alert_float" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' + build_element_error(resp) + '</div>';
    $(element_alert).appendTo('body');
};

function rendering_file_upload(input) {
    if (input.files) {
        for (var i = 0; i < input.files.length; i++) {
            var file_temp = input.files[i];

            var is_file_exist = $.grep(file_multi_upload_list, function (el, idx) {
                return file_multi_upload_list[idx].file.name.toUpperCase() == file_temp.name.toUpperCase();
            });

            if (is_file_exist.length == 0) {
                var guid_temp = generateUID();
                file_multi_upload_list.push({
                    id: 0,
                    file: file_temp,
                    guid: guid_temp
                });
                var file_name = file_temp.name;
                var reader = new FileReader();
                reader.onload = function (e) {
                    var element_file = '<li class="list-group-item" id="file_upload_' + guid_temp + '"><span class="badge" style="background-color:#fff !important;"><a style="cursor: pointer;" onclick="delete_file_upload(\'' + guid_temp + '\')"><i class="fas fa-times-circle"></i></a> <a style="cursor: pointer;" onclick="download_file_upload(\'' + guid_temp + '\', true)"><i class="fas fa-cloud-download-alt"></i></a></span>' +
                        file_name + '</li>';
                    $('#uploaded_file_list').append(element_file);
                };
                reader.readAsDataURL(file_temp);
            }
        }
        input.value = '';
    }
}

function onRequestEnd(e, gridID) {
    var grid = $(gridID).data("kendoGrid");
    var data = grid.dataSource;
    if (e.type == "create" || e.type == "update") {
        if (!e.response.Errors)
            data.read();
    }
}

function addExtensionClass(extension) {
    switch (extension) {
        case '.jpg':
            return 'jpg-file';
        case '.png':
            return 'png-file';
        case '.bmp':
            return 'bmp-file';
        case '.doc':
        case '.docx':
            return 'doc-file';
        case '.xls':
            return 'xls-file';
        case '.xlsx':
            return 'xlsx-file';
        case '.ppt':
            return 'ppt-file';
        case '.pdf':
            return 'pdf-file';
        case '.tiff':
            return 'tiff-file';
        default:
            return 'default-file';
    }
}

function LoadPDF(pdfDoc, pdfLoc) {
    PDFJS.getDocument(pdfDoc).then(function (pdf) {
        pdf.getPage(1).then(function (page) {
            var unscaledViewport = page.getViewport(1);
            var canvas = document.getElementById(pdfLoc);
            var scale = Math.max((canvas.height / unscaledViewport.height), (canvas.width / unscaledViewport.width));
            var viewport = page.getViewport(scale);
            var context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            var renderContext =
            {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}

function LoadError(flag) {
    var canvas = document.getElementById('thumbnailPDFDetail'), context = canvas.getContext('2d');
    var filePath;
    if (flag == 'unavailable') {
        filePath = '/img/503Error.png';
    } else if (flag == 'error') {
        filePath = '/img/500Error.png';
    };
    make_base();
    function make_base() {
        base_image = new Image();
        base_image.src = filePath;
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, 200, 200 * base_image.height / base_image.width);
        };
    }
}

function LoadImage(imgDoc, imgLoc) {
    var canvas = document.getElementById(imgLoc), context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    make_base();
    function make_base() {
        base_image = new Image();
        base_image.src = imgDoc;
        canvas.height = 350;
        base_image.onload = function () {
            context.drawImage(base_image, 0, 0, base_image.width, base_image.height,
                0, 0, canvas.width, canvas.height);
        };
    }
}

function RenderPDF(path, container, options) {
    var options = options || { scale: 1.5 }
    function renderPage(page) {
        var viewport = page.getViewport(options.scale);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        container.appendChild(canvas);
        document.getElementById(container).appendChild(canvas);
        page.render(renderContext);
    }
    function renderPages(pdfDoc) {
        for (var i = 1; i < pdfDoc.numPages; i++) {
            pdfDoc.getPage(i).then(renderPage);
        }
    }
    PDFJS.disableWorker = true;
    PDFJS.getDocument(path).then(renderPage);
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) 
            return 0;

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB)
            comparison = 1;
        else if (varA < varB)
            comparison = -1;
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

var sequence = (funcs, scope) => {
    if (funcs.length == 0)
        return;
    let f = funcs.shift();
    f.call(scope, () => {
        sequence(funcs, scope)
    });
};