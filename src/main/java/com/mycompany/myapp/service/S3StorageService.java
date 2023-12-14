package com.mycompany.myapp.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.mycompany.myapp.service.utils.FileValidator;
import com.mycompany.myapp.service.exceptions.FileIsEmptyException;
import com.mycompany.myapp.service.exceptions.FileNotImageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class S3StorageService {

    private final String bucketName;
    private final String accessKey;
    private final String secretKey;
    private final String awsRegion;

    private final AmazonS3 s3;

    public S3StorageService(
        @Value("${bucketName:default}") String bucketName,
        @Value("${accessKey:default}") String accessKey,
        @Value("${secretKey:default}") String secretKey,
        @Value("${region:default}") String awsRegion
    ) {
        this.bucketName = bucketName;
        this.accessKey  = accessKey;
        this.secretKey  = secretKey;
        this.awsRegion  = awsRegion;

        this.s3 = AmazonS3ClientBuilder.standard()
            .withCredentials(
                new AWSStaticCredentialsProvider(
                    new BasicAWSCredentials(this.accessKey,this.secretKey)))
            .withRegion(this.awsRegion)
            .build();
    }

    public String saveFile(MultipartFile file) throws FileIsEmptyException, FileNotImageException {
        new FileValidator(file).isNotEmpty()
                               .isImage();

        String originalFilename = file.getOriginalFilename();
        int count = 0;
        int maxTries = 3;

        while(true) {
            try {
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(file.getSize());

                s3.putObject(new PutObjectRequest(bucketName, originalFilename, file.getInputStream(), metadata));

                return "https://" + bucketName + ".s3." + awsRegion + ".amazonaws.com/" + originalFilename;
            } catch (IOException e) {
                if (++count == maxTries) throw new RuntimeException(e);
            }
        }
    }

    public byte[] downloadFile(String filename) {
        S3Object object = s3.getObject(bucketName, filename);
        S3ObjectInputStream objectContent = object.getObjectContent();

        try {
            return IOUtils.toByteArray(objectContent);
        } catch (IOException e) {
            throw  new RuntimeException(e);
        }
    }

    public String deleteFile(String filename) {
        s3.deleteObject(bucketName, filename);

        return "File deleted";
    }

    public List<String> listAllFiles() {
        ListObjectsV2Result listObjectsV2Result = s3.listObjectsV2(bucketName);

        return  listObjectsV2Result.getObjectSummaries().stream()
            .map(S3ObjectSummary::getKey)
            .collect(Collectors.toList());
    }

}
