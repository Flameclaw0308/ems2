package com.anirudh.usersmanagementsystem.exportfunction;

import com.anirudh.usersmanagementsystem.entity.OurUsers;
import com.anirudh.usersmanagementsystem.repository.UsersRepo;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReportServicetoExcel{

    @Autowired
    private UsersRepo usersRepo;
    public void generateExcel(HttpServletResponse response) throws IOException{
        List<OurUsers> users=usersRepo.findAll();
        HSSFWorkbook workbook= new HSSFWorkbook();
        HSSFSheet sheet=workbook.createSheet("Employee Info");
        HSSFRow row=sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("name");
        row.createCell(2).setCellValue("email");
        row.createCell(3).setCellValue("city");
        row.createCell(4).setCellValue("role");
        int dataRowIndex=1;
        for(OurUsers user: users)
        {
            HSSFRow dataRow=sheet.createRow(dataRowIndex);
            dataRow.createCell(0).setCellValue(user.getId());
            dataRow.createCell(1).setCellValue(user.getName());
            dataRow.createCell(2).setCellValue(user.getEmail());
            dataRow.createCell(3).setCellValue(user.getCity());
            dataRow.createCell(4).setCellValue(user.getRole());
            dataRowIndex++;
        }
        ServletOutputStream ops=response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }
}
