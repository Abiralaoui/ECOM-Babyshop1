package com.mycompany.myapp.service.utils;

import com.mycompany.myapp.service.dto.CarteBancaireDTO;

import java.time.Instant;
import java.util.regex.Pattern;

public class CarteBancaireValidator {

    private static final Pattern CARD_NUMBER_PATTERN = Pattern.compile("^\\d{16}$");
    private static final Pattern CVV_PATTERN = Pattern.compile("^\\d{3}$");

    public static boolean validateCardNumber(String cardNumber) {
        return CARD_NUMBER_PATTERN.matcher(cardNumber).matches();
    }
    public static boolean validateDateExpiration(Instant dateExpiration) {
        return dateExpiration != null && dateExpiration.isAfter(Instant.now());
    }
    public static boolean validateCvv(Integer cvv) {
        return cvv != null && CVV_PATTERN.matcher(String.valueOf(cvv)).matches();
    }
    public static boolean validateCarteBancaire(CarteBancaireDTO carteBancaire) {
        return carteBancaire != null &&
            validateCardNumber(String.valueOf(carteBancaire.getNumCarte())) &&
            validateDateExpiration(carteBancaire.getDateExpiration()) &&
            validateCvv(carteBancaire.getCvv());
    }


}
