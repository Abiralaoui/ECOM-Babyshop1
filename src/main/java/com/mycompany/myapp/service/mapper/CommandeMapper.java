package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.*;
import org.mapstruct.*;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper for the entity {@link Commande} and its DTO {@link CommandeDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommandeMapper extends EntityMapper<CommandeDTO, Commande> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    @Mapping(target = "ligneCommandes", source = "ligneCommandes", qualifiedByName = "ligneCommandesIdSet")
    CommandeDTO toDto(Commande s);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);

    @Named("ligneCommandeId")
    LigneCommandeDTO toDtoLigneCommandeId(LigneCommande ligneCommande);

    @Named("ligneCommandesIdSet")
    default Set<LigneCommandeDTO> toDtoLigneCommandeIdSet(Set<LigneCommande> ligneCommandes) {
        return ligneCommandes.stream().map(this::toDtoLigneCommandeId).collect(Collectors.toSet());
    }
}
