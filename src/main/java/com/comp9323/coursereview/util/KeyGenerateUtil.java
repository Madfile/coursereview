package com.comp9323.coursereview.util;

import java.util.Random;

public class KeyGenerateUtil {

    public static synchronized String genUniqueKey() {
        Random random = new Random();

        Integer number = random.nextInt(900000) + 100000;

        return System.currentTimeMillis() + String.valueOf(number);
    }
}
