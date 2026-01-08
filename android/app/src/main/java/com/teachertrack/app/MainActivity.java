package com.teachertrack.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onResume() {
        super.onResume();
        // Force WebView refresh on resume to prevent white screen
        if (this.bridge != null && this.bridge.getWebView() != null) {
            this.bridge.getWebView().postInvalidate();
        }
    }
}
