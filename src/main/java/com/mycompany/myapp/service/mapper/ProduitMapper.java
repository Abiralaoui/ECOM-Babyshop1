package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Category;
import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.domain.Produit;
import com.mycompany.myapp.service.dto.CategoryDTO;
import com.mycompany.myapp.service.dto.ImageDTO;
import com.mycompany.myapp.service.dto.ProduitDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {
    @Mapping(target = "images", source = "images", qualifiedByName = "imageIdSet")
    @Mapping(target = "categories", source = "categories", qualifiedByName = "categoryIdSet")
    ProduitDTO toDto(Produit s);

    @Mapping(target = "removeImage", ignore = true)
    @Mapping(target = "removeCategory", ignore = true)
    Produit toEntity(ProduitDTO produitDTO);

    @Named("categoryId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    CategoryDTO toDtoCategoryId(Category category);

    @Named("categoryIdSet")
    default Set<CategoryDTO> toDtoCategoryIdSet(Set<Category> category) {
        return category.stream().map(this::toDtoCategoryId).collect(Collectors.toSet());
    }

    @Named("imageId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ImageDTO toDtoImageId(Image image);

    @Named("imageIdSet")
    default Set<ImageDTO> toDtoImageIdSet(Set<Image> image) {
        return image.stream().map(this::toDtoImageId).collect(Collectors.toSet());
    }
}
