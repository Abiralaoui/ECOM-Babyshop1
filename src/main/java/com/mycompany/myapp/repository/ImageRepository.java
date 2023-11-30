package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Image;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the Image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByProduitId(Long id);

}
