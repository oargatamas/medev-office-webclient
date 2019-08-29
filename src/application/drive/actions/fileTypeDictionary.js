import csvIcon from "../../../resources/icons/icon-csv.svg";
import xlsIcon from "../../../resources/icons/icon-microsoft-excel.svg";
import pptIcon from "../../../resources/icons/icon-microsoft-powerpoint.svg";
import vndIcon from "../../../resources/icons/icon-microsoft-visio.svg";
import docIcon from "../../../resources/icons/icon-microsoft-word.svg";
import imgIcon from "../../../resources/icons/icon-image.svg";
import pdfIcon from "../../../resources/icons/icon-pdf.svg";
import rtfIcon from "../../../resources/icons/icon-rtf.svg";
import xmlIcon from "../../../resources/icons/icon-xml.svg";
import txtIcon from "../../../resources/icons/icon-txt.svg";
import dataIcon from "../../../resources/icons/icon-data.svg";
import csvIconDisabled from "../../../resources/icons/icon-csv-disabled.svg";
import xlsIconDisabled from "../../../resources/icons/icon-microsoft-excel-disabled.svg";
import pptIconDisabled from "../../../resources/icons/icon-microsoft-powerpoint-disabled.svg";
import vndIconDisabled from "../../../resources/icons/icon-microsoft-visio-disabled.svg";
import docIconDisabled from "../../../resources/icons/icon-microsoft-word-disabled.svg";
import imgIconDisabled from "../../../resources/icons/icon-image-disabled.svg";
import pdfIconDisabled from "../../../resources/icons/icon-pdf-disabled.svg";
import rtfIconDisabled from "../../../resources/icons/icon-rtf-disabled.svg";
import xmlIconDisabled from "../../../resources/icons/icon-xml-disabled.svg";
import txtIconDisabled from "../../../resources/icons/icon-txt-disabled.svg";
import dataIconDisabled from "../../../resources/icons/icon-data-disabled.svg";


export const fileTypes = [
    {icon: dataIcon, disabledIcon:dataIconDisabled, extension: "bin", mimeType: "application/octet-stream"},
    {icon: dataIcon, disabledIcon:dataIconDisabled, extension: "eul", mimeType: "application/octet-stream"},
    {icon: imgIcon, disabledIcon:imgIconDisabled, extension: "bmp", mimeType: "image/bmp"},
    {icon: csvIcon, disabledIcon:csvIconDisabled, extension: "csv", mimeType: "text/csv"},
    {icon: docIcon, disabledIcon:docIconDisabled, extension: "doc", mimeType: "application/msword"},
    {icon: docIcon, disabledIcon:docIconDisabled, extension: "docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    {icon: imgIcon, disabledIcon:imgIconDisabled, extension: "gif", mimeType: "image/gif"},
    {icon: imgIcon, disabledIcon:imgIconDisabled, extension: "jpeg", mimeType: "image/jpeg"},
    {icon: imgIcon, disabledIcon:imgIconDisabled, extension: "jpg", mimeType: "image/jpeg"},
    {icon: imgIcon, disabledIcon:imgIconDisabled, extension: "png", mimeType: "image/png"},
    {icon: pdfIcon, disabledIcon:pdfIconDisabled, extension: "pdf", mimeType: "application/pdf"},
    {icon: pptIcon, disabledIcon:pptIconDisabled, extension: "ppt", mimeType: "application/vnd.ms-powerpoint"},
    {icon: pptIcon, disabledIcon:pptIconDisabled, extension: "pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
    {icon: rtfIcon, disabledIcon:rtfIconDisabled, extension: "rtf", mimeType: "application/rtf"},
    {icon: txtIcon, disabledIcon:txtIconDisabled, extension: "txt", mimeType: "text/plain"},
    {icon: vndIcon, disabledIcon:vndIconDisabled, extension: "vsd", mimeType: "application/vnd.visio"},
    {icon: xlsIcon, disabledIcon:xlsIconDisabled, extension: "xls", mimeType: "application/vnd.ms-excel"},
    {icon: xlsIcon, disabledIcon:xlsIconDisabled, extension: "xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
    {icon: xmlIcon, disabledIcon:xmlIconDisabled, extension: "xml", mimeType: "application/xml"},
    {icon: xmlIcon, disabledIcon:xmlIconDisabled, extension: "xml", mimeType: "text/xml"},
];