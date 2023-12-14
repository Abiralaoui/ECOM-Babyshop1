package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Produit;
import com.mycompany.myapp.repository.ProduitRepository;
import com.mycompany.myapp.service.dto.ProduitDTO;
import com.mycompany.myapp.service.mapper.ProduitMapper;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mycompany.myapp.service.exceptions.FileIsEmptyException;
import com.mycompany.myapp.service.exceptions.FileNotImageException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service Implementation for managing {@link Produit}.
 */
@Service
@Transactional
public class ProduitService {

    private final Logger log = LoggerFactory.getLogger(ProduitService.class);

    private final ProduitRepository produitRepository;

    private final ImageService imageService;

    private final ProduitMapper produitMapper;

    public ProduitService(ProduitRepository produitRepository,
                          ProduitMapper produitMapper,
                          ImageService imageService) {
        this.produitRepository = produitRepository;
        this.produitMapper = produitMapper;
        this.imageService = imageService;
    }

    /**
     * Save a produit.
     *
     * @param produitDTO the entity to save.
     * @return the persisted entity.
     */

    @Transactional
    public ProduitDTO save(ProduitDTO produitDTO, List<MultipartFile> images) throws FileIsEmptyException, FileNotImageException {
        log.debug("Request to save Produit : {}", produitDTO);

        Produit produit = produitMapper.toEntity(produitDTO);
        List<String> uploadedImagesName = new ArrayList<>();

        produit = produitRepository.save(produit);

        if (images != null) {
            produitDTO = produitMapper.toDto(produit);

            try {
                for (MultipartFile image : images)
                    uploadedImagesName.add(
                        imageService.uploadImageToS3Bucket(image, produitDTO)
                    );
            } catch (Exception exception) {
                handleS3StorageException(exception, uploadedImagesName);

                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            }
        }

        return produitMapper.toDto(produit);
    }

    private void handleS3StorageException(Exception e, List<String> imagesName) {
        log.error("Exception occurred in S3 storage service: " + e.getMessage());

        imagesName.forEach(imageService::deleteImagesFromS3Bucket);
    }

    @Transactional
    public ProduitDTO save(ProduitDTO produitDTO) {
        log.debug("Request to save Produit : {}", produitDTO);
        Produit produit = produitMapper.toEntity(produitDTO);
        produit = produitRepository.save(produit);
        return produitMapper.toDto(produit);
    }

    /**
     * Update a produit.
     *
     * @param produitDTO the entity to save.
     * @return the persisted entity.
     */
    public ProduitDTO update(ProduitDTO produitDTO) {
        log.debug("Request to update Produit : {}", produitDTO);
        Produit produit = produitMapper.toEntity(produitDTO);
        produit = produitRepository.save(produit);
        return produitMapper.toDto(produit);
    }

    /**
     * Partially update a produit.
     *
     * @param produitDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProduitDTO> partialUpdate(ProduitDTO produitDTO) {
        log.debug("Request to partially update Produit : {}", produitDTO);

        return produitRepository
            .findById(produitDTO.getId())
            .map(existingProduit -> {
                produitMapper.partialUpdate(existingProduit, produitDTO);

                return existingProduit;
            })
            .map(produitRepository::save)
            .map(produitMapper::toDto);
    }

    public Optional<ProduitDTO> findOneWithLockingById(Long id) {
        return produitRepository.findWithLockingById(id).map(produitMapper::toDto);
    }

    /**
     * Get all the produits.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProduitDTO> findAll() {
        log.debug("Request to get all Produits");
        return produitRepository.findAll().stream().map(produitMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the produits with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProduitDTO> findAllWithEagerRelationships(Pageable pageable) {
        return produitRepository.findAllWithEagerRelationships(pageable).map(produitMapper::toDto);
    }

    /**
     * Get one produit by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProduitDTO> findOne(Long id) {
        log.debug("Request to get Produit : {}", id);
        return produitRepository.findOneWithEagerRelationships(id).map(produitMapper::toDto);
    }

    /**
     * Delete the produit by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Produit : {}", id);
        produitRepository.deleteById(id);
    }

    public Produit getProduitById(Long id) {
        log.debug("Request to get Produit : {}", id);
        return produitRepository.getById(id);
    }

    public Page<ProduitDTO> searchProductByKeyword(String keyword, Pageable pageable) {
        return produitRepository.findByKeyword(keyword, pageable).map(produitMapper::toDto);
    }
}
