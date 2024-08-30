import * as xlsx from 'xlsx'

const DEF_FILE_NAME = 'excel-list.xlsx'
const DEF_SHEET_NAME = 'sheet';

const { utils, writeFile } = xlsx
/**
 * 根据数组下载excel文件
 * @param data 数据 二维数组
 * @param header 表头 一纬数组
 * @param fileName 文件名
 * @param write2ExcelOpts writeFile 的参数
 */
export function aoaToSheetXlsx({ data, header, fileName = DEF_FILE_NAME }) {
  const arrData = [ ...data ]
  if ( header ) {
    arrData.unshift(header)
  }

  const worksheet = utils.aoa_to_sheet(arrData)

  const workbook = {
    SheetNames: [fileName],
    Sheets: {
      [fileName]: worksheet
    },
  }

  writeFile(workbook, fileName)
}

// 多sheet下载数组excel文件
export function aoaToMultipleSheetXlsx({ sheetList, fileName = DEF_FILE_NAME }) {
  const workbook = {
    SheetNames: [],
    Sheets: {}
  }
  
  sheetList.map((item, index) => {
    const arrData = [ ...item.data ]
    if ( item.header ) {
      arrData.unshift(item.header)
    }
    
    item.sheetName = item.sheetName || `${DEF_SHEET_NAME}${index}`
    workbook.SheetNames.push(item.sheetName)
    workbook.Sheets[item.sheetName] = utils.aoa_to_sheet(arrData)
  })

  writeFile(workbook, fileName)
}

function setColumnWidth(data, worksheet, min = 3) {
  console.log('list--->', data, worksheet);

  const obj = {};
  worksheet['!cols'] = [];
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const cur = item[key];
      const length = cur?.length ?? min;
      obj[key] = Math.max(length, obj[key] ?? min);
    });
  });
  // 计算worksheet的宽度
  Object.keys(obj).forEach((key) => {
    worksheet['!cols'].push({
      wch: obj[key],
    });
  });
}

// json导出excel
export function jsonToSheetXlsx({ data, header, fileName = DEF_FILE_NAME, sheetName = DEF_SHEET_NAME, json2sheetOpts = {}, write2excelOpts = {} }) {
  const arrData = [ ...data ]
  if ( header ) {
    arrData.unshift(header)
    // @ts-ignore
    json2sheetOpts.skipHeader = true
  }

  const worksheet = utils.json_to_sheet(arrData, json2sheetOpts)
  setColumnWidth(arrData, worksheet);
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: worksheet
    },
  }
  writeFile(workbook, fileName, write2excelOpts)
}

export function jsonToMultipleSheetXlsx({ sheetList, fileName = DEF_FILE_NAME, json2sheetOpts = {} }) {
  const workbook = {
    SheetNames: [],
    Sheets: {}
  }

  sheetList.map((item, index) => {
    let arrData = [ ...item.data ]
    if ( item.header ) {
      arrData.unshift(item.header)
      json2sheetOpts.skipHeader = true
    }

    const worksheet = utils.json_to_sheet(arrData, json2sheetOpts)
    setColumnWidth(arrData, worksheet);
    item.sheetName = item.sheetName || `${DEF_SHEET_NAME}${index}`
    workbook.SheetNames.push(item.sheetName)
    workbook.Sheets[item.sheetName] = worksheet
  })

  writeFile(workbook, fileName)
}
