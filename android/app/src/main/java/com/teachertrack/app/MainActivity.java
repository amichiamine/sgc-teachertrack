package com.teachertrack.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onResume() {
        super.onResume();
        // Force le WebView à se rafraîchir au retour pour éviter l'écran blanc
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().postInvalidate();
        }
    }
}
