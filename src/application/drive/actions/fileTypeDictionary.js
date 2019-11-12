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


export const fileTypes = [
    {icon: dataIcon,  extension: "bin", mimeType: "application/octet-stream"},
    {icon: dataIcon,  extension: "eul", mimeType: "application/octet-stream"},
    {icon: imgIcon, extension: "bmp", mimeType: "image/bmp"},
    {icon: csvIcon, extension: "csv", mimeType: "text/csv"},
    {icon: docIcon, extension: "doc", mimeType: "application/msword"},
    {icon: docIcon, extension: "docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
    {icon: imgIcon, extension: "gif", mimeType: "image/gif"},
    {icon: imgIcon, extension: "jpeg", mimeType: "image/jpeg"},
    {icon: imgIcon, extension: "jpg", mimeType: "image/jpeg"},
    {icon: imgIcon, extension: "png", mimeType: "image/png"},
    {icon: pdfIcon, extension: "pdf", mimeType: "application/pdf"},
    {icon: pptIcon, extension: "ppt", mimeType: "application/vnd.ms-powerpoint"},
    {icon: pptIcon, extension: "pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
    {icon: rtfIcon, extension: "rtf", mimeType: "application/rtf"},
    {icon: txtIcon, extension: "txt", mimeType: "text/plain"},
    {icon: vndIcon, extension: "vsd", mimeType: "application/vnd.visio"},
    {icon: xlsIcon, extension: "xls", mimeType: "application/vnd.ms-excel"},
    {icon: xlsIcon, extension: "xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
    {icon: xmlIcon, extension: "xml", mimeType: "application/xml"},
    {icon: xmlIcon, extension: "xml", mimeType: "text/xml"},
];