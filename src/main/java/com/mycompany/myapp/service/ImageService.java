package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.domain.Produit;
import com.mycompany.myapp.repository.ImageRepository;
import com.mycompany.myapp.repository.ProduitRepository;
import com.mycompany.myapp.service.dto.ImageDTO;
import com.mycompany.myapp.service.dto.ProduitDTO;
import com.mycompany.myapp.service.exceptions.FileIsEmptyException;
import com.mycompany.myapp.service.exceptions.FileNotImageException;
import com.mycompany.myapp.service.mapper.ImageMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mycompany.myapp.service.utils.NamingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service Implementation for managing {@link Image}.
 */
@Service
@Transactional
public class ImageService {

    private final Logger log = LoggerFactory.getLogger(ImageService.class);

    private final ImageRepository imageRepository;

    private final ProduitRepository produitRepository;

    private final S3StorageService s3StorageService;

    private final ImageMapper imageMapper;

    public ImageService(ImageRepository imageRepository, ProduitRepository produitRepository, S3StorageService s3StorageService, ImageMapper imageMapper) {
        this.imageRepository = imageRepository;
        this.produitRepository = produitRepository;
        this.s3StorageService = s3StorageService;
        this.imageMapper = imageMapper;
    }

    /**
     * Save a image.
     *
     * @param imageDTO the entity to save.
     * @return the persisted entity.
     */
    public ImageDTO save(ImageDTO imageDTO) {
        log.debug("Request to save Image : {}", imageDTO);
        Image image = imageMapper.toEntity(imageDTO);
        Produit produit = produitRepository.getById(imageDTO.getProduit().getId());
        image.setProduit(produit);
        image = imageRepository.save(image);
        return imageMapper.toDto(image);
    }

    /**
     * Update a image.
     *
     * @param imageDTO the entity to save.
     * @return the persisted entity.
     */
    public ImageDTO update(ImageDTO imageDTO) {
        log.debug("Request to update Image : {}", imageDTO);
        Image image = imageMapper.toEntity(imageDTO);
        image = imageRepository.save(image);
        return imageMapper.toDto(image);
    }

    /**
     * Partially update a image.
     *
     * @param imageDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ImageDTO> partialUpdate(ImageDTO imageDTO) {
        log.debug("Request to partially update Image : {}", imageDTO);

        return imageRepository
            .findById(imageDTO.getId())
            .map(existingImage -> {
                imageMapper.partialUpdate(existingImage, imageDTO);

                return existingImage;
            })
            .map(imageRepository::save)
            .map(imageMapper::toDto);
    }

    /**
     * Get all the images.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ImageDTO> findAll() {
        log.debug("Request to get all Images");
        return imageRepository.findAll().stream().map(imageMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one image by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ImageDTO> findOne(Long id) {
        log.debug("Request to get Image : {}", id);
        return imageRepository.findById(id).map(imageMapper::toDto);
    }

    /**
     * Delete the image by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Image : {}", id);
        imageRepository.deleteById(id);
    }

    public List<String> findUrlsByProductId(Long id) {
        log.debug("Request image urls by product id : " + id);

        return imageRepository.findByProduitId(id).stream().map(image -> image.getUrl()).collect(Collectors.toList());
    }

    @Transactional
    public String uploadImageToS3Bucket(MultipartFile image, ProduitDTO produitDTO) throws FileIsEmptyException, FileNotImageException {
        var multipartUniqueFile = NamingService.generateUniqueImageFile(image);
        String url = s3StorageService.saveFile(
            multipartUniqueFile
        );

        save(new ImageDTO(url, produitDTO));

        return multipartUniqueFile.getOriginalFilename();
    }


    public void deleteImagesFromS3Bucket(String imageName) {
        s3StorageService.deleteFile(imageName);
    }

}
