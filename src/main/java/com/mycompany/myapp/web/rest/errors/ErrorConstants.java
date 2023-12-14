package com.mycompany.myapp.web.rest.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String ERR_CONCURRENCY_FAILURE = "Oops ! Quelqu'un d'autre a modifié cet élément. Veuillez actualiser la page et réessayer. Contactez le support si le problème persiste.\n";
    public static final String ERR_VALIDATION = "error.validation";
    public static final String ERR_CARD_VALIDATION = "Les données de la carte bancaire ne sont pas correctes.";
    public static final String ERR_PRODUCT_OUT_OF_STOCK = "Le produit que vous essayez d'acheter est actuellement en rupture de stock. Veuillez vérifier la disponibilité ultérieurement ou choisir un autre produit.";
    public static final String ERR_NOT_ENOUGH_ITEMS_IN_STOCK = "There isn't enough items left on stock.";
    public static final String PROBLEM_BASE_URL = "https://www.jhipster.tech/problem";
    public static final URI DEFAULT_TYPE = URI.create(PROBLEM_BASE_URL + "/problem-with-message");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create(PROBLEM_BASE_URL + "/constraint-violation");
    public static final URI INVALID_PASSWORD_TYPE = URI.create(PROBLEM_BASE_URL + "/invalid-password");
    public static final URI EMAIL_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/email-already-used");
    public static final URI LOGIN_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/login-already-used");

    private ErrorConstants() {}
}
