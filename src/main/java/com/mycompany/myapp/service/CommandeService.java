package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CarteBancaire;
import com.mycompany.myapp.domain.Commande;
import com.mycompany.myapp.domain.LigneCommande;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.EtatCommande;
import com.mycompany.myapp.repository.ClientRepository;
import com.mycompany.myapp.repository.CommandeRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.dto.ClientDTO;
import com.mycompany.myapp.service.dto.CommandeDTO;
import com.mycompany.myapp.service.exceptions.CarteBancaireNotValidException;
import com.mycompany.myapp.service.exceptions.OutOfStockException;
import com.mycompany.myapp.service.mapper.CommandeMapper;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.mycompany.myapp.service.utils.CarteBancaireValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Commande}.
 */
@Service
@Transactional
public class CommandeService {

    private final Logger log = LoggerFactory.getLogger(CommandeService.class);

    private final CommandeRepository commandeRepository;

    private final CommandeMapper commandeMapper;

    private final LigneCommandeService ligneCommandeService;

    private final UserRepository userRepository;

    private final MailService mailService;


    public CommandeService(UserRepository userRepository,CommandeRepository commandeRepository, CommandeMapper commandeMapper, LigneCommandeService ligneCommandeService,MailService mailService) {
        this.commandeRepository = commandeRepository;
        this.commandeMapper = commandeMapper;
        this.ligneCommandeService = ligneCommandeService;
        this.mailService=mailService;
        this.userRepository=userRepository;
    }

    /**
     * Save a commande.
     *
     * @param commandeDTO the entity to save.
     * @return the persisted entity.
     */
    @Transactional(rollbackFor = Exception.class)
    public CommandeDTO save(CommandeDTO commandeDTO) throws CarteBancaireNotValidException, OutOfStockException {
        log.debug("Request to save Commande : {}", commandeDTO);
        Commande commande = commandeMapper.toEntity(commandeDTO);
        CarteBancaire carteBancaire = commande.getCarteBancaire();

        if (!CarteBancaireValidator.validateCarteBancaire(carteBancaire))
            throw new CarteBancaireNotValidException("Bank card informations are not valid.");

        commande.setDate(Instant.now());
        commande = commandeRepository.save(commande);

        var ligneCommandes = commandeDTO.getLigneCommandes();

        for (var ligneCommande: ligneCommandes) {
            ligneCommandeService.save(ligneCommande, commande.getId());
            ligneCommandeService.updateStock(ligneCommande.getProduit().getId(), ligneCommande.getQuantite());
        }

        commandeDTO.setEtat(EtatCommande.PAYEE);
        commandeDTO.setId(commande.getId());
          sendConfirmationEmail(commandeDTO);
        partialUpdate(commandeDTO);
      


        return commandeMapper.toDto(commande);
    }

    /**
     * Update a commande.
     *
     * @param commandeDTO the entity to save.
     * @return the persisted entity.
     */
    public CommandeDTO update(CommandeDTO commandeDTO) {
        log.debug("Request to update Commande : {}", commandeDTO);
        Commande commande = commandeMapper.toEntity(commandeDTO);
        commande = commandeRepository.save(commande);
        return commandeMapper.toDto(commande);
    }

    /**
     * Partially update a commande.
     *
     * @param commandeDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CommandeDTO> partialUpdate(CommandeDTO commandeDTO) {
        log.debug("Request to partially update Commande : {}", commandeDTO);

        return commandeRepository
            .findById(commandeDTO.getId())
            .map(existingCommande -> {
                commandeMapper.partialUpdate(existingCommande, commandeDTO);

                return existingCommande;
            })
            .map(commandeRepository::save)
            .map(commandeMapper::toDto);
    }

    /**
     * Get all the commandes.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CommandeDTO> findAll() {
        log.debug("Request to get all Commandes");
        return commandeRepository.findAll().stream().map(commandeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one commande by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CommandeDTO> findOne(Long id) {
        log.debug("Request to get Commande : {}", id);
        return commandeRepository.findById(id).map(commandeMapper::toDto);
    }

    /**
     * Delete the commande by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Commande : {}", id);
        commandeRepository.deleteById(id);
    }

    public List<CommandeDTO> getCommandsByClientId(Long id) {
        log.debug("Request all commands by client id : {}", id);
        return commandeRepository.findByClientId(id).stream().map(commandeMapper::toDto).collect(Collectors.toList());
    }
    /**
     * Send email confirmation to the client.
     *
     * @param commandeDTO the order details.
     */
    private void sendConfirmationEmail(CommandeDTO commandeDTO) {
        User user = getUserFromCommandeDTO(commandeDTO); // Replace this with actual logic to get the user
  log.debug("user to sent email  : {}", user);
        if (user != null && user.getEmail() != null) {
            String subject = "Order Confirmation";
            String content = "Thank you for your order! Your order ID is: " + commandeDTO.getId();

            mailService.sendEmail(user.getEmail(), subject, content, false, true);
        }else {  log.warn("User or user email is null. Cannot send confirmation email."); }
    }
    private User getUserFromCommandeDTO(CommandeDTO commandeDTO) {
        ClientDTO clientDTO = commandeDTO.getClient();
          log.debug("clientdto : {}", clientDTO);
       long clientId = clientDTO != null ? clientDTO.getId() : null;
  log.debug("clientid  : {}", clientId);
        return userRepository.findById(clientId)
            .map(user -> {
               
                return user;
            })
            .orElse(null); 
    
        
    }
}
