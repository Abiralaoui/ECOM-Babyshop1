package com.mycompany.myapp.service.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

public class NamingService {

    public static MultipartFile generateUniqueImageFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isEmpty())
            throw new IllegalArgumentException("Invalid file name");

        String uniqueImageName = generateUniqueImageName(originalFileName);

        return new CustomMultipartFile(file, uniqueImageName);
    }

    private static String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');

        if (lastDotIndex == -1)
            return "";
        return fileName.substring(lastDotIndex + 1);
    }

    private static String generateUniqueImageName(String originalFileName) {
        // Get the file extension from the original file name
        String fileExtension = getFileExtension(originalFileName);

        // Generate a UUID as the unique part of the image name
        String uniquePart = UUID.randomUUID().toString();

        // Combine the UUID and file extension to create the unique image name
        return uniquePart + "." + fileExtension;
    }

    private static class CustomMultipartFile implements MultipartFile {

        private final MultipartFile file;
        private final String fileName;

        public CustomMultipartFile(MultipartFile file, String fileName) {
            this.file = file;
            this.fileName = fileName;
        }

        @Override
        public String getName() {
            return file.getName();
        }

        @Override
        public String getOriginalFilename() {
            return fileName;
        }

        @Override
        public String getContentType() {
            return file.getContentType();
        }

        @Override
        public boolean isEmpty() {
            return file.isEmpty();
        }

        @Override
        public long getSize() {
            return file.getSize();
        }

        @Override
        public byte[] getBytes() throws IOException {
            return file.getBytes();
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return file.getInputStream();
        }

        @Override
        public void transferTo(java.io.File dest) throws IOException, IllegalStateException {
            file.transferTo(dest);
        }
    }

}
