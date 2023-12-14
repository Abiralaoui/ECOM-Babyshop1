package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.domain.Produit;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.LockModeType;

/**
 * Spring Data JPA repository for the Produit entity.
 *
 * When extending this class, extend ProduitRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface ProduitRepository
    extends ProduitRepositoryWithBagRelationships, JpaRepository<Produit, Long>, JpaSpecificationExecutor<Produit> {
    default Optional<Produit> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Produit> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Produit> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    default List<Produit> findAllByCategories(List<Category> categories, long categoryCount) {
        return this.fetchBagRelationships(findProductsByAllCategories(categories, categoryCount));
    }

    @Query("SELECT DISTINCT p FROM Produit p " +
        "JOIN p.categories c " +
        "WHERE c IN :categories " +
        "GROUP BY p " +
        "HAVING COUNT(DISTINCT c) = :categoryCount")
    List<Produit> findProductsByAllCategories(@Param("categories") List<Category> categories,
                                             @Param("categoryCount") long categoryCount);

    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    Optional<Produit> findWithLockingById(Long id);

    @Query("SELECT p FROM Produit p WHERE p.libelle LIKE %:keyword%")
    Page<Produit> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
