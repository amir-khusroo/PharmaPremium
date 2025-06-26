package com.premium.pharma.utils;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.premium.pharma.entity.MedicineItem;
import com.premium.pharma.entity.Purchase;
import com.premium.pharma.model.PlanName;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.stream.Stream;

@Component

public class InvoiceGenerator {
    public static File generateInvoice(String userEmail, PlanName planName, BigDecimal amount, LocalDate start, LocalDate end) throws Exception {
        String fileName = "Invoice_" + userEmail + ".pdf";
        File file = new File(fileName);

        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(file));
        document.open();

        document.addTitle("PharmaPremium Subscription Invoice");
        document.add(new Paragraph("PharmaPremium Subscription Invoice"));
        document.add(new Paragraph("Date: " + LocalDate.now()));
        document.add(new Paragraph(" "));
        document.add(new Paragraph("Customer: " + userEmail));
        document.add(new Paragraph("Plan: " + planName));
        document.add(new Paragraph("Amount: ₹" + amount));
        document.add(new Paragraph("Validity: " + start + " to " + end));

        document.close();
        return file;
    }
    public static File generateBillInvoicePdf(Purchase purchase) throws DocumentException, IOException {
        // Ensure directory exists
        File dir = new File("invoices");
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Define file path
        String filename = "invoice_" + purchase.getId() + ".pdf";
        File file = new File(dir, filename);

        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(file));

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
        Paragraph title = new Paragraph("PharmaPremium Invoice", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph("Date: " + purchase.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))));
        document.add(new Paragraph("Patient: " + purchase.getPatient().getName()));
        document.add(new Paragraph("Pharma Partner: " + purchase.getPartner().getName()));
        document.add(Chunk.NEWLINE);

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new int[]{4, 2, 1, 2});

        addTableHeader(table);
        for (MedicineItem item : purchase.getItems()) {
            addRow(table, item);
        }

        document.add(table);

        document.add(Chunk.NEWLINE);
        document.add(new Paragraph("Total: $" + purchase.getTotalAmount()));
        document.add(new Paragraph("Discount: -$" + purchase.getDiscount()));
        document.add(new Paragraph("Final Amount: $" + purchase.getFinalAmount()));

        document.close();

        return file;
    }

    private static void addRow(PdfPTable table, MedicineItem item) {
        table.addCell(item.getName());
        table.addCell(String.format("$%.2f", item.getPrice()));
        table.addCell(String.valueOf(item.getQuantity()));
        table.addCell(String.format("$%.2f", item.getPrice() * item.getQuantity()));
    }

    private static void addTableHeader(PdfPTable table) {
        Stream.of("Medicine", "Price", "Qty", "Total")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }

}
